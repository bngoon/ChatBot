from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.chat_view, name='chat'),  # Endpoint for chat functionality
]
