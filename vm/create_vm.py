import googleapiclient.discovery
from dotenv import load_dotenv
import os

load_dotenv('.env')

def create_mv(compute):
  config = {
    "name": "model-manager-vm",
    "zone": "us-east1-b",
    "machineType": 'zones/{}/machineTypes/n1-standard-1'.format(zone),
    "subnet": "https://www.googleapis.com/compute/v1/projects/{}/regions/us-east1/subnetworks/default".format(project),
    "tags": {
      "items": ["http-server", "https-server", "model-manager-tag"]
    },
    "networkInterfaces": [
      {
        "network": "https://www.googleapis.com/compute/v1/projects/{}/global/networks/default".format(project),
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
          "diskSizeGb": "10",
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
      'scopes': ['https://www.googleapis.com/auth/cloud-platform']
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

if __name__ == "__main__":
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

  pass