import pytest
from rest_framework import status
from django.urls import reverse


@pytest.mark.django_db
class TestUser:
    # [resource]-list for get
    def test_list_return_200_users(self, get_user_data, create_user, create_client):
        url_endpoint = reverse("user-list")
        user_data = get_user_data()
        create_user(user_data)
        response = create_client().get(url_endpoint)
        assert response.status_code == status.HTTP_200_OK
