import logging
from functools import lru_cache

from pydantic import BaseSettings, Field


log = logging.getLogger(__name__)


class Settings(BaseSettings):
    ENVIRONMENT: str = Field(...)
    DEBUG: bool = Field(...)
    PUSHER_APP_ID: str = Field(...)
    PUSHER_KEY: str = Field(...)
    PUSHER_SECRET: str = Field(...)


@lru_cache()
def get_settings() -> BaseSettings:
    log.info("Loading config settings from the environment...")
    return Settings()


settings = get_settings()
