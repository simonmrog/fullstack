from fastapi import APIRouter

from app.api.endpoints import beams

api_router = APIRouter()

api_router.include_router(beams.router, prefix="/beams")
