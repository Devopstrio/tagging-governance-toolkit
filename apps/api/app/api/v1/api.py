from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, policies, resources, compliance, audit, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(policies.router, prefix="/policies", tags=["policies"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["compliance"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
