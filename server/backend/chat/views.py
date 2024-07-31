from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ChatMessage
from .serializers import ChatMessageSerializer
import openai

class ChatMessageView(APIView):
    def post(self, request):
        message = request.data.get('message')
        response = self.get_chat_response(message)
        chat_message = ChatMessage.objects.create(message=message, response=response)
        serializer = ChatMessageSerializer(chat_message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_chat_response(self, message):
        openai.api_key = 'your-openai-api-key'
        response = openai.Completion.create(
            engine="davinci",
            prompt=message,
            max_tokens=150
        )
        return response.choices[0].text.strip()
