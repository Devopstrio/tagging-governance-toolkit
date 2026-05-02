from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_resources():
    return {'resources': [{'id': 'i-123', 'name': 'web-prod', 'compliant': True}]}
@router.post('/validate')
def validate_all():
    return {'status': 'STARTED', 'job_id': 'job-v-99'}
@router.post('/remediate')
def remediate(res_id: str):
    return {'status': 'REMEDIATED', 'id': res_id}
