
from pusher_push_notifications import PushNotifications


class BeamsClient:
    beams_client: PushNotifications = None

    def __init__(self):
        self.beams_client = PushNotifications(
            instance_id="036ff004-b890-44fd-a663-ccfe0b58bb67",
            secret_key="619D8969CCA8B6BECF622B0E351F2450A2262E41A4494AFCA626AEA5F922F6C0",
        )

    def generate_token(self, user_id):
        try:
            beams_token = self.beams_client.generate_token(user_id)
            return beams_token
        except Exception as e:
            print("[ERROR]", e)
            return None

    def push_notification(self, notification):
        try:
            response = self.beams_client.publish_to_users(
                user_ids=["user_id"],
                publish_body={
                    "apns": {
                        "aps": {
                            "alert": notification
                        },
                    },
                    "fcm": {
                        "notification": notification
                    },
                    "web": {
                        "notification": notification
                    },
                },
            )
            print(response["publishId"])
            return response["publishId"]
        except Exception as e:
            print("[ERROR]", e)
            return None


beams_client = BeamsClient()


# if __name__ == "__main__":
#     notification = {
#         "title": "Push notification",
#         "body": "This is a push notification!"
#     }
#     beams_client.push_notification(notification)
