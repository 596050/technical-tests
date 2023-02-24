import pytest
from rest_framework import status
from django.urls import reverse


from ..management.commands.initialize_database import Command as init_database


@pytest.mark.django_db
class TestTask:
    # [resource]-list for get
    def test_list_return_tasks_200(self, create_client):
        url_endpoint = reverse("task-list")
        response = create_client().get(url_endpoint)
        assert response.status_code == status.HTTP_200_OK

    # [resource]-list for get
    def test_filter_tasks_by_status_return_tasks_200(self, create_client):
        client = create_client()
        command = init_database()
        command.create_mock_users()
        command.create_mock_tasks()
        command.create_mock_task_assignments()

        url_endpoint = reverse("search-task-list")

        response = client.get(url_endpoint)

        response_results = dict(response.data)['results']

        assert len(response_results) > 0
        assert response.status_code == status.HTTP_200_OK

        url_endpoint = "%s?status=COMPLETE" % reverse("search-task-list")

        response = client.get(url_endpoint)

        for res in dict(response.data)['results']:
            assert res['status'] == "COMPLETE"
