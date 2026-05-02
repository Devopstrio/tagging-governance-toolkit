from typing import List, Dict, Any
from datetime import datetime

class ScanningEngine:
    """Simulates a cloud resource scanner to extract tags for governance."""
    
    def scan_inventory(self) -> List[Dict[str, Any]]:
        # Simulation: In a real world we'd use boto3, azure-sdk, or google-cloud-sdk
        return [
            {
                "id": "i-0a1b2c3d4e5f6g7h8",
                "name": "prod-api-server-01",
                "type": "ec2-instance",
                "provider": "aws",
                "region": "us-east-1",
                "tags": {
                    "Environment": "prod",
                    "Owner": "ops@example.com",
                    "CostCenter": "Engineering",
                    "Project": "Nexus"
                }
            },
            {
                "id": "sql-staging-db",
                "name": "staging-db-primary",
                "type": "managed-sql",
                "provider": "azure",
                "region": "westeurope",
                "tags": {
                    "Environment": "staging",
                    "Project": "Core"
                    # Missing Owner and CostCenter
                }
            },
            {
                "id": "dev-bucket-992",
                "name": "developer-sandbox-storage",
                "type": "object-storage",
                "provider": "gcp",
                "region": "us-central1",
                "tags": {
                    "env": "development" # Wrong key (Environment) and wrong value (dev)
                }
            }
        ]
