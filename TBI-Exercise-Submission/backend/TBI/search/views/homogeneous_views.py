from rest_framework import pagination
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, BaseInFilter, CharFilter, OrderingFilter

from ..models import User, Task
from ..serializers import UserSerializer, TaskSerializer, TaskSearchSerializer


class BaseViewSet(viewsets.ModelViewSet):
    allowed_methods = ['GET', 'POST', 'PUT', "PATCH", 'DELETE']
    permission_classes = []


class UserViewSet(BaseViewSet):
    queryset = User.objects.all().order_by('-date_created')
    serializer_class = UserSerializer


class TaskViewSet (BaseViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class SearchPagination(pagination.PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 50
    page_query_param = 'p'


class CharInFilter(BaseInFilter, CharFilter):
    pass


class SearchFilterSet(FilterSet):
    assignees__id = CharInFilter(
        field_name='assignees__id', lookup_expr='in')
    assignees__last_name = CharInFilter(
        field_name='assignees__last_name', lookup_expr='in')
    assignees__first_name = CharInFilter(
        field_name='assignees__first_name', lookup_expr='in')
    assignees__email = CharInFilter(
        field_name='assignees__email', lookup_expr='in')

    # sort according to assignees and status (incomplete, complete).
    # /search/search-task/?o=-status
    o = OrderingFilter(
        fields=(
            ('status', 'status'),
            ('assignees__first_name', 'assignees__first_name'),
            ('assignees__last_name', 'assignees__last_name'),
            ('assignees__email', 'assignees__email'),
        )
    )

    class Meta:
        # filter according to assignees and status (incomplete, complete).
        fields = [
            "assignees",
            "status"
        ]
        model = Task


class SearchViewSet(viewsets.ModelViewSet):
    # /search/search-task/?p=2&page_size=3&search=jere
    allowed_methods = ['GET']
    permission_classes = []
    serializer_class = TaskSearchSerializer
    pagination_class = SearchPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    # search according to assignees, title, body and status
    search_fields = [
        "assignees__first_name",
        "assignees__last_name",
        "assignees__email",
        "title",
        "body",
        "status"
    ]
    filterset_class = SearchFilterSet

    def get_queryset(self):
        queryset = Task.objects.all().order_by('id')
        return queryset
