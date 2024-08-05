from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import requests
from django.conf import settings
from django.contrib.auth.models import User

class ClerkAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            # Extract the token
            token = auth_header.split(' ')[1]
            
            # Verify the token with Clerk's API
            response = requests.get(
                f"{settings.CLERK_API_URL}/tokens/verify",
                headers={
                    "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
                },
                params={"token": token},
            )
            
            if response.status_code == 200:
                data = response.json()
                # Get or create a user based on the Clerk user ID
                user, _ = User.objects.get_or_create(username=data['sub'])
                return (user, None)
            else:
                raise AuthenticationFailed('Invalid token')
        except Exception as e:
            raise AuthenticationFailed('Invalid token')