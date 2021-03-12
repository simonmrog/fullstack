import os
from pusher_push_notifications import PushNotifications


class BeamsClient:
    beams_client: PushNotifications = None

    def __init__(self):
        self.beams_client = PushNotifications(
            instance_id=os.getenv("PUSHER_INSTANCE_ID"),
            secret_key=os.getenv("PUSHER_SECRET_KEY"),
        )

    def generate_token(self, user_id):
        try:
            beams_token = self.beams_client.generate_token(user_id)
            return beams_token
        except Exception as e:
            print("[ERROR]", e)
            return None

    def push_notification(self, notification, user_ids):
        try:
            response = self.beams_client.publish_to_users(
                user_ids=user_ids,
                publish_body={
                    "apns": {
                        "aps": {
                            "alert": notification
                        },
                        "data": notification["data"]
                    },
                    "fcm": notification,
                    "web": notification
                },
            )
            return response["publishId"]
        except Exception as e:
            print("[ERROR]", e)
            return None


beams_client = BeamsClient()
