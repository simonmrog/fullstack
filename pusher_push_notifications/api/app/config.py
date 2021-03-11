from enum import IntEnum

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    env: str = Field("dev", env="ENVIRONMENT")
    testing: bool = Field(0, env="TESTING")
    # WEB_APP_TITLE: str = Field(...)
    # WEB_APP_DESCRIPTION: str = Field(...)
    # WEB_APP_VERSION: str = Field(...)
    # DEFAULT_EXPIRE_TIME: int = Field(...)
    # HOST_LOGSTASH: str = Field(...)
    # PORT_LOGSTASH: int = Field(...)
    # MAGAYA_DB: str = Field(...)

    # CERTIFICATION_URL: str = Field(...)
    # MAGAYA_URL: str = Field(...)

    # RABBITMQ_USER: str = Field("user")
    # RABBITMQ_PASSWORD: str = Field("bitnami")
    # RABBITMQ_HOST: str = Field("localhost")
    # RABBITMQ_PORT: int = Field(5672)

    # REDIS_USER: str = Field("")
    # REDIS_PASSWORD: str = Field("password123")
    # REDIS_HOST: str = Field("localhost")
    # REDIS_PORT: int = Field(6379)


# class Credentials(BaseSettings):
#     userName: str = Field(..., env="USER_NAME")
#     password: str = Field(..., env="PASSWORD")
#     grant_type: str = Field(..., env="GRANT_TYPE")

#     class Config:
#         allow_population_by_field_name = True


settings = Settings()
# credentials = Credentials()
