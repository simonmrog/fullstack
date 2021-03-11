from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    pusher_instance_id: Field("PUSHER_INSTANCE_ID")
    pusher_secre_key: Field("PUSHER_SECRET_KEY")


settings = Settings()
