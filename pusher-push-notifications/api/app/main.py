from fastapi import FastAPI
from app.api.api import api_router


def init_application() -> FastAPI:
    application = FastAPI()
    application.include_router(api_router, prefix="/api")
    return application


app = init_application()
