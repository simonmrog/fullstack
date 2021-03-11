from enum import Enum

from fastapi import APIRouter, status
from pydantic import BaseModel, Field

from app.config import settings

from app.services.beams import beams_client

router = APIRouter()


class StatusEnum(str, Enum):
    OK = "OK"
    FAILURE = "FAILURE"
    CRITICAL = "CRITICAL"
    UNKNOWN = "UNKNOWN"


class HealthCheck(BaseModel):
    title: str = Field(..., description="CFT business rule")
    description: str = Field(
        ..., description="This is a microservice to evaluate the CFT business rules"
    )
    version: str = Field(..., description="0.0.1")
    status: StatusEnum = Field(..., description="API current status")
    expire_time: int = Field(..., description="ACCESS TOKEN EXPIRE TIME")


@router.get(
    "/health-check",
    response_model=HealthCheck,
    status_code=status.HTTP_200_OK,
    tags=["Health Check"],
    summary="Performs health check",
    description="Performs health check and returns information about running service.",
)
def health_check():
    return {
        "title": settings.WEB_APP_TITLE,
        "description": settings.WEB_APP_DESCRIPTION,
        "version": settings.WEB_APP_VERSION,
        "status": StatusEnum.OK,
        "expire_time": settings.DEFAULT_EXPIRE_TIME,
    }


# Beams auth endpoint
@router.get("/beams-auth")
def beams_auth(user_id: str):
    # Verify if user is in the database
    # If user is authorized
    users = ["user_id"]
    if not user_id in users:
        return {"status": "error", "detail": "Unauthorized user"}
    beams_token = beams_client.generate_token(user_id)
    return beams_token
    # Else response error


# Pushes notification to browser
@router.post("/push_notification")
def push_notification(notification: dict):

    if not notification or not bool(notification):
        notification = {
            "title": "Hello",
            "body": "Hello, world!",
        }

    notification_id = beams_client.push_notification(notification)
    return {"status": StatusEnum.OK, "notification_id": notification_id}
