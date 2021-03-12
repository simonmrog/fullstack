from fastapi import APIRouter

from app.services.beams import beams_client

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
        return {"status": "error", "detail": f"{e}"}
        # Else response error


# Pushes notification to browser
@router.post("/push_notification")
def push_notification(notification: dict):

    if not notification or not bool(notification):
        notification = {
            "notification": {
                "title": "Hello",
                "body": "Hello, world!"
            },
            "data": "My data"
        }

    # User id of the company which receives the email
    user_ids = ["user_id"]

    # Send push notification
    notification_id = beams_client.push_notification(notification, user_ids)
    return {"status": "ok", "notification_id": notification_id}
