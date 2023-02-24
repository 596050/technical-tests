from rest_framework import serializers
from .base_serializer import BaseSerializer
from .user_serializer import UserSerializer
from ..models import Task

class TaskSerializer(BaseSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TaskSearchSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(format='hex_verbose', read_only=True)

    def _get_assignees(self, obj):
        o = Task.objects.get(id=obj.id)
        return UserSerializer(o.assignees, many=True).data
    assignees = serializers.SerializerMethodField('_get_assignees')

    class Meta:
        model = Task
        exclude = ['date_created', 'date_updated']
