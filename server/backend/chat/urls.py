from django.urls import path
from .views import ChatMessageView

urlpatterns = [
    path('chat/', ChatMessageView.as_view(), name='chat'),
]
