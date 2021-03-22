from fastapi import APIRouter
from app.api.endpoints import pusher

router = APIRouter()

router.include_router(pusher.router, prefix="/pusher")
