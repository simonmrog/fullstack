import pusher

from app.config import settings


class PusherService:
    __pusher_client: pusher.Pusher = None

    def __init__(self):
        self.__pusher_client = pusher_client = pusher.Pusher(
            app_id=settings.PUSHER_APP_ID,
            key=settings.PUSHER_KEY,
            secret=settings.PUSHER_SECRET,
            cluster="us2",
            ssl=True
        )

    def trigger(self, data):
        self.__pusher_client.trigger("chat-messages", "new-message", data)


pusher_service = PusherService()
