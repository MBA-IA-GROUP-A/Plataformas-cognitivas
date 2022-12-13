import googleapiclient.discovery
from dotenv import load_dotenv
import os
import subprocess
import json

load_dotenv('.env')

def create_mv(compute):
  config = {
    "name": "model-manager-vm",
    "zone": "us-east1-b",
    "startRestricted": False,
    "machineType": 'zones/{}/machineTypes/e2-small'.format(zone),
    "subnet": "https://www.googleapis.com/compute/v1/projects/{}/regions/us-east1/subnetworks/default".format(project),
    "tags": {
      "items": ["http-server", "https-server", "model-manager-tag"]
    },
    "networkInterfaces": [
      {
        "network": "https://www.googleapis.com/compute/v1/projects/wallbee-app/global/networks/default",
        "subnetwork": "https://www.googleapis.com/compute/v1/projects/wallbee-app/regions/us-central1/subnetworks/default",
        "accessConfigs": [
          {
            "name": "External NAT",
            "type": "ONE_TO_ONE_NAT"
          }
        ]
      }
    ],
    "disks": [
      {
        "boot": True,
        "autoDelete": True,
        "initializeParams": {
          "sourceImage": "https://www.googleapis.com/compute/v1/projects/ubuntu-os-cloud/global/images/ubuntu-1804-bionic-v20200529",
          "diskSizeGb": "50",
          "diskType": "https://www.googleapis.com/compute/v1/projects/{}/zones/us-east1-b/diskTypes/pd-standard".format(project)
        }
      }
    ],
    "canIpForward": False,
    "shieldedInstanceConfig": {
      "enableSecureBoot": False,
      "enableVtpm": True,
      "enableIntegrityMonitoring": True
    },
    'serviceAccounts': [{
      'email': 'ia-service-account@wallbee-app.iam.gserviceaccount.com',
      'scopes': ['https://www.googleapis.com/auth/cloud-platform',
          "https://www.googleapis.com/auth/devstorage.read_only",
          "https://www.googleapis.com/auth/logging.write",
          "https://www.googleapis.com/auth/monitoring.write",
          "https://www.googleapis.com/auth/servicecontrol",
          "https://www.googleapis.com/auth/service.management.readonly",
          "https://www.googleapis.com/auth/trace.append"
        ]
    }]
  }

  vm = compute.instances().insert(
        project=project,
        zone=zone,
        body=config).execute()

  while vm['status'] != 'DONE':
    vm = compute.zoneOperations().get(
        project=project,
        zone=zone,
        operation=vm['name']).execute()

  print(vm)
  return vm

def create_firewall(compute):
  firewall = {
    "name": "model-manager-firewall",
    "description": "Libera portas necessárias para práticas de plataformas cognitivas",
    "direction": "INGRESS",
    "priority": 1000,
    "network": "https://www.googleapis.com/compute/v1/projects/{}/global/networks/default".format(project),
    "action": "ALLOW",
    "allowed": [
      {
        "IPProtocol": "tcp",
        "ports": [
          "8080",
          "8081",
          "5000",
          "1234",
          "443",
          "1235",
          "1236",
          "1237"
        ]
      }
    ],
    "sourceRanges": [
      "0.0.0.0/0"
    ],
    "targetTags": [
      "model-manager-tag"
    ]
  }

  firewall = compute.firewalls().insert(
    project=project,
    body=firewall).execute()

  print(firewall)
  return firewall

def prepare_vm():
  credentials = None
  with open(os.getenv('SERVICE_ACCOUNT_JSON_PATH')) as cred_file:
    credentials = json.load(cred_file)

  subprocess.run(["gcloud", "auth", "activate-service-account", credentials["client_email"], "--key-file={}".format(os.getenv('SERVICE_ACCOUNT_JSON_PATH'))])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", os.getcwd(), "model-manager-vm:~/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "ssh", "--zone", "us-central1-a", "model-manager-vm", "--project", "wallbee-app", "--command", "sudo bash -c 'cd ~/Plataformas && ./vm/setup_vm.sh'"])
  subprocess.run(["gcloud", "compute", "ssh", "--zone", "us-central1-a", "model-manager-vm", "--project", "wallbee-app", "--command", "sudo bash -c 'cd ~/Plataformas && ./run_model_manager.sh'"])
  pass

if __name__ == "__main__":
  pathToFederationModel = 'tmp/models/federation_model.h5'
  if (os.path.exists(pathToFederationModel) == False):
    print('Federation Model not found, train a new model...')
    subprocess.run(["python", "federation_model/train.py"])

  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv('SERVICE_ACCOUNT_JSON_PATH')

  compute = googleapiclient.discovery.build('compute', 'v1')
  project = 'wallbee-app'
  zone = 'us-central1-a'

  vm = compute.instances().list(
    project='wallbee-app',
    zone='us-central1-a').execute()

  exists = False
  if 'items' in vm:
    for instance in vm['items']:
      if instance['name'] != 'model-manager-vm':
        continue
      exists = True
      break

  if not exists:
    create_mv(compute)

  firewall = compute.firewalls().list(
    project='wallbee-app').execute()

  existsFirewall = False

  if 'items' in firewall:
    for fw in firewall['items']:
      if fw['name'] != 'model-manager-firewall':
        continue
      existsFirewall = True
      break

  if not existsFirewall:
    create_firewall(compute)

  prepare_vm()
  pass