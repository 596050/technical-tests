from .base_serializer import BaseSerializer
from ..models import User


class UserSerializer(BaseSerializer):
    class Meta:
        model = User
        exclude = [
            'password',
            'last_login',
            'date_created',
            'date_updated',
            'is_superuser',
            'is_staff'
        ]
