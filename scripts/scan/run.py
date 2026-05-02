import sys
import time
from core.governance.engine import TaggingPolicyEngine, RemediationEngine, CostAllocationEngine
from core.scanning.engine import ScanningEngine

def run_governance_simulation():
    # 1. Initialize Engines
    scanner = ScanningEngine()
    policy_engine = TaggingPolicyEngine()
    remediator = RemediationEngine()
    cost_engine = CostAllocationEngine()
    
    print("--- Tagging Governance Toolkit Platform Simulation ---")
    
    # 2. Scan Resources
    print(f"\n[SCAN] Orchestrating multi-cloud resource discovery...")
    inventory = scanner.scan_inventory()
    print(f"  Discovered {len(inventory)} resources across AWS, Azure, and GCP.")
    
    # 3. Validate Compliance
    print(f"\n[VALIDATION] Evaluating tagging compliance against enterprise policies...")
    results = []
    for resource in inventory:
        res = policy_engine.validate_resource_tags(resource["id"], resource["tags"])
        results.append(res)
        status = "COMPLIANT" if res["is_compliant"] else "NON-COMPLIANT"
        print(f"  Resource: {resource['name']} | Status: {status} | Score: {res['compliance_score']}%")
        
        # 4. remediate if needed
        if not res["is_compliant"]:
            for v in res["violations"]:
                suggestion = remediator.suggest_remediation(v, resource)
                if suggestion:
                    print(f"    >>> REMEDIATION SUGGESTED: {suggestion['action']} {suggestion['key']}={suggestion.get('value', suggestion.get('source'))}")

    # 5. Cost Allocation
    print(f"\n[FINOPS] Mapping resource metadata to financial cost centers...")
    for resource in inventory:
        allocation = cost_engine.allocate_cost(150.0, resource["tags"]) # Mock cost
        print(f"  Resource: {resource['name']} | Allocated to: {allocation['cost_center']} | Amount: ${allocation['amount']}")

if __name__ == "__main__":
    run_governance_simulation()
