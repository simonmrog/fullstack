from typing import Dict, List

from pydantic import BaseModel, Field


class NotificationData(BaseModel):
    title: str = Field(...)
    body: str = Field(...)
    data: Dict


class Notification(BaseModel):
    user_ids: List[str]
    notification: NotificationData
