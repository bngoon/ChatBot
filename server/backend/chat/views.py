from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import google.generativeai as gemini
import os
import json

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_view(request):
    # Extract the message from the request body
    data = json.loads(request.body)
    message = data.get('message', '')

    if not message:
        return JsonResponse({'error': 'Message is required'}, status=400)

    try:
        # Retrieve your API key or credentials from environment variables
        api_key = os.getenv('GOOGLE_GEMINI_API_KEY')

        if not api_key:
            return JsonResponse({'error': 'API key is missing'}, status=500)

        # Initialize the Gemini client
        gemini_client = gemini.Client(api_key)

        # Call the Gemini API
        response = gemini_client.chat(message)

        # Extract the response from the Gemini API
        bot_response = response.get('response', 'No response from bot')

        return JsonResponse({'response': bot_response}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
