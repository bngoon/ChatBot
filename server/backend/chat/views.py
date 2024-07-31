from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from openai import OpenAI
import os
from dotenv import load_dotenv
import asyncio

# Load environment variables from .env file
load_dotenv()

class ChatMessageView(APIView):
    def post(self, request):
        message = request.data.get('message')
        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)
        response = asyncio.run(self.get_chat_response(message))
        if response is None:
            return Response({"error": "Failed to get response from AI"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        chat_message = ChatMessage.objects.create(message=message, response=response)
        serializer = ChatMessageSerializer(chat_message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    async def get_chat_response(self, message):
        try:
            client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
            response = await client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": message}
                ],
                model="gpt-3.5-turbo"
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error in OpenAI API call: {e}")
            return None
