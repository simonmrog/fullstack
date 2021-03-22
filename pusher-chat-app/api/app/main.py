from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import router
from app.debugger import init_debugger

from app.config import settings


def init_app():
    if settings.DEBUG:
        init_debugger()
    app = FastAPI()
    app.include_router(router, prefix="/api")
    return app


app = init_app()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
