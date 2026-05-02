import re
from typing import List, Dict, Any, Optional
from datetime import datetime

class TaggingPolicyEngine:
    """Manages and evaluates tagging policies across cloud resources."""
    
    def __init__(self):
        self.default_policies = [
            {"key": "Environment", "required": True, "allowed_values": ["prod", "staging", "dev"]},
            {"key": "Owner", "required": True, "format": r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"},
            {"key": "CostCenter", "required": True, "allowed_values": ["Engineering", "Marketing", "Sales", "HR"]},
            {"key": "Project", "required": False}
        ]

    def validate_resource_tags(self, resource_id: str, tags: Dict[str, str]) -> Dict[str, Any]:
        violations = []
        compliant_keys = []
        
        for policy in self.default_policies:
            key = policy["key"]
            value = tags.get(key)
            
            # 1. Required Check
            if policy["required"] and not value:
                violations.append({
                    "type": "MISSING_REQUIRED_TAG",
                    "key": key,
                    "message": f"Required tag '{key}' is missing."
                })
                continue
                
            if value:
                # 2. Allowed Values Check
                if "allowed_values" in policy and value not in policy["allowed_values"]:
                    violations.append({
                        "type": "INVALID_TAG_VALUE",
                        "key": key,
                        "value": value,
                        "message": f"Value '{value}' for tag '{key}' is not in allowed list: {policy['allowed_values']}"
                    })
                    continue
                
                # 3. Format Check (Regex)
                if "format" in policy and not re.match(policy["format"], value):
                    violations.append({
                        "type": "INVALID_TAG_FORMAT",
                        "key": key,
                        "value": value,
                        "message": f"Value '{value}' for tag '{key}' does not match required format."
                    })
                    continue
                
                compliant_keys.append(key)
                
        # Compliance Score Calculation
        total_required = len([p for p in self.default_policies if p["required"]])
        met_required = len([k for k in compliant_keys if any(p["key"] == k and p["required"] for p in self.default_policies)])
        
        score = (met_required / total_required * 100) if total_required > 0 else 100
        
        return {
            "resource_id": resource_id,
            "is_compliant": len(violations) == 0,
            "compliance_score": round(score, 2),
            "violations": violations,
            "timestamp": datetime.utcnow().isoformat()
        }

class RemediationEngine:
    """Suggests and applies fixes for tagging violations."""
    
    def suggest_remediation(self, violation: Dict[str, Any], context: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        v_type = violation.get("type")
        key = violation.get("key")
        
        if v_type == "MISSING_REQUIRED_TAG":
            # Heuristic: If we are in a dev VPC, suggest Environment=dev
            if key == "Environment" and "dev" in context.get("resource_name", "").lower():
                return {"action": "SET_TAG", "key": key, "value": "dev", "confidence": "HIGH"}
            
            # Heuristic: Suggest owner from creator tag if exists
            if key == "Owner" and "Creator" in context.get("tags", {}):
                return {"action": "COPY_TAG", "source": "Creator", "target": key, "confidence": "MEDIUM"}
                
        return None

class CostAllocationEngine:
    """Maps tags to cost centers and generates financial allocation reports."""
    
    def allocate_cost(self, resource_cost: float, tags: Dict[str, str]) -> Dict[str, Any]:
        cost_center = tags.get("CostCenter", "Unallocated")
        project = tags.get("Project", "General")
        
        return {
            "amount": resource_cost,
            "cost_center": cost_center,
            "project": project,
            "is_allocated": cost_center != "Unallocated"
        }

if __name__ == "__main__":
    # Test Simulation
    engine = TaggingPolicyEngine()
    remediator = RemediationEngine()
    
    print("--- Tagging Governance Toolkit Simulation ---")
    
    # 1. Validate Non-Compliant Resource
    bad_tags = {"Environment": "production", "Project": "Apollo"} # 'production' is invalid (should be 'prod'), missing Owner and CostCenter
    res = engine.validate_resource_tags("i-1234567890abcdef0", bad_tags)
    
    print(f"Compliance Score: {res['compliance_score']}%")
    for v in res["violations"]:
        print(f"  Violation: {v['type']} | {v['message']}")
        
        # 2. Try Remediation
        suggestion = remediator.suggest_remediation(v, {"resource_name": "dev-web-server", "tags": bad_tags})
        if suggestion:
            print(f"    Suggested Fix: {suggestion['action']} {suggestion['key']}={suggestion.get('value', suggestion.get('source'))}")
