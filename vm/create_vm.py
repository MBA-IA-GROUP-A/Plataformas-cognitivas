import googleapiclient.discovery
from dotenv import load_dotenv
import os
import subprocess
import json
import time

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
          "sourceImage": "https://www.googleapis.com/compute/v1/projects/ubuntu-os-cloud/global/images/ubuntu-1804-bionic-v20221201",
          "imageSizeGb": "50",
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
  print('Preparando a VM, aguarde...')

  credentials = None
  with open(os.getenv('SERVICE_ACCOUNT_JSON_PATH')) as cred_file:
    credentials = json.load(cred_file)

  subprocess.run(["gcloud", "auth", "activate-service-account", credentials["client_email"], "--key-file={}".format(os.getenv('SERVICE_ACCOUNT_JSON_PATH'))])
  # subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", os.getcwd(), "model-manager-vm:~/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "ssh", "--zone", "us-central1-a", "model-manager-vm", "--project", "wallbee-app", "--command", "mkdir -p ~/Plataformas"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'credentials.json', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", '.env', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'dockerfile', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'R.dockerfile', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'dockerfile.model_manager', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'generate_config.sh', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'run_model_manager.sh', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", 'requirements.txt', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'vm', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'model_manager', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'normalization', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'get_data', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'tmp', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'config', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'r_model', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'cluster_model', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "scp", "--zone", "us-central1-a", "--recurse", 'federation_model', "model-manager-vm:~/Plataformas/", "--project", "wallbee-app"])
  subprocess.run(["gcloud", "compute", "ssh", "--zone", "us-central1-a", "model-manager-vm", "--project", "wallbee-app", "--command", "sudo bash -c 'cd ~/Plataformas && ./vm/setup_vm.sh'"])
  subprocess.run(["gcloud", "compute", "ssh", "--zone", "us-central1-a", "model-manager-vm", "--project", "wallbee-app", "--command", "sudo bash -c 'cd ~/Plataformas && ./run_model_manager.sh'"])
  
  print('VM preparada com sucesso!')
  pass

if __name__ == "__main__":
  os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv('SERVICE_ACCOUNT_JSON_PATH')

  compute = googleapiclient.discovery.build('compute', 'v1')
  project = 'wallbee-app'
  zone = 'us-central1-a'

  vms = compute.instances().list(
    project='wallbee-app',
    zone='us-central1-a').execute()

  exists = False
  vm_ip = None
  if 'items' in vms:
    for instance in vms['items']:
      if instance['name'] != 'model-manager-vm':
        continue
      exists = True
      break

  if not exists:
    vm = create_mv(compute)

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

  vms = compute.instances().list(project='wallbee-app', zone='us-central1-a').execute()

  if 'items' in vms:
    for instance in vms['items']:
      if instance['name'] != 'model-manager-vm':
        continue
      vm_ip = instance['networkInterfaces'][0]['accessConfigs'][0]['natIP']
      break

  time.sleep(30)
  prepare_vm()

  print('Endpoint URL:', 'http://{}:443'.format(vm_ip))
  pass