module "governance_db" {
  source = "./modules/database"

  db_name = "tagging_governance_metadata"
}

module "compliance_cache" {
  source = "./modules/redis"

  retention_policy = "allkeys-lru"
}

module "governance_monitoring" {
  source = "./modules/monitoring"

  alert_email = "governance-alerts@example.com"
}

resource "kubernetes_namespace" "governance_ops" {
  metadata {
    name = "tagging-governance-toolkit"
    labels = {
      "governance.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "governance_policies" {
  metadata {
    name      = "tagging-global-policies"
    namespace = kubernetes_namespace.governance_ops.metadata[0].name
  }

  data = {
    "enforcement-mode"     = "audit"
    "min-compliance-score" = "80"
    "remediation-enabled"  = "true"
    "drift-detection-interval" = "1h"
  }
}
