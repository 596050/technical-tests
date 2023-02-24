from django.urls import include, path
from rest_framework import routers

from .views import UserViewSet, TaskViewSet, SearchViewSet

router = routers.DefaultRouter()

router.register(r'user', UserViewSet, basename="user")

router.register(r'task', TaskViewSet, basename="task")

router.register(r'search-task', SearchViewSet, basename="search-task")

urlpatterns = [
    path('', include(router.urls)),
]
