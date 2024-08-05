from django.http import JsonResponse
from rest_framework.decorators import api_view
import google.generativeai as genai
import os
import json

@api_view(['POST'])
def chat_view(request):
    try:
        data = json.loads(request.body)
        message = data.get('message', '')

        if not message:
            return JsonResponse({'error': 'Message is required'}, status=400)

        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            return JsonResponse({'error': 'API key is missing'}, status=500)

        # Configure the Generative AI client
        genai.configure(api_key=api_key)

        # Set up the generation configuration
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,
            "max_output_tokens": 2048,
            "response_mime_type": "text/plain",
        }

        # Create the Generative Model
        model = genai.GenerativeModel(
            model_name="gemini-1.0-pro",
            generation_config=generation_config,
        )

        # Start a chat session
        chat_session = model.start_chat(
            history=[]
        )

        # Send the user's message to the chat session
        response = chat_session.send_message(message)

        # Access the response text properly
        bot_response = response.text if hasattr(response, 'text') else 'No response from bot'

        return JsonResponse({'response': bot_response}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
