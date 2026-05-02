from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_policies():
    return {'policies': [{'id': 'p-1', 'name': 'Standard Tagging', 'version': '1.0'}]}
@router.post('/create')
def create_policy(data: dict = Body(...)):
    return {'status': 'CREATED', 'id': 'p-new'}
