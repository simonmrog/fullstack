from fastapi import APIRouter

from app.services.beams import beams_client

from app.schemas.notification import Notification

router = APIRouter()


# Beams auth endpoint
@router.get("/beams-auth")
def beams_auth(user_id: str):
    try:
        # Verify if user is in the database
        # If user is authorized
        users = ["user_id", "user_id3", "user_id4"]
        if not user_id in users:
            raise Exception("Unauthorizated user")
        beams_token = beams_client.generate_token(user_id)
        return beams_token
    except Exception as e:
        # Else response error
        print(e)
        return {"status": "error", "detail": f"{e}"}


# Pushes notification to browser
@router.post("/push_notification")
def push_notification(notification_data: Notification):
    try:
        user_ids = notification_data.user_ids
        notification = notification_data.notification

        # Send push notification
        notification_id = beams_client.push_notification(
            notification.dict(), user_ids)
        return {"status": "ok", "notification_id": notification_id}
    except Exception as e:
        print(e)
        return {"status": "error", "detail": f"{e}"}
