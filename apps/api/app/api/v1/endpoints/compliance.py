from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_compliance_summary():
    return {'global_score': 84.5, 'total_resources': 1250, 'compliant_count': 1050}
