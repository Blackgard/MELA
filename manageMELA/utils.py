from core.api_v0.serializers import UserSerializer

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user':  UserSerializer(user, context={'request': request}).data
    }