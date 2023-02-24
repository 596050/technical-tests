import pytest

from ..models import User
from rest_framework.test import APIClient
from django.urls import reverse

empty_user_data = dict(
    email='',
    password='',
)

default_user_data = dict(
    email="admin@gmail.com",
    password="admin",
    is_superuser=False,
)

pytest.user_data_default = default_user_data


@pytest.fixture(scope="function")
def get_user_data():
    def _get_user_data(data=None):
        ud = data
        # use singleton so that user can be set consistently for tests
        if ud is None:
            ud = pytest.user_data_default
        else:
            pytest.user_data_default = ud
        return ud

    yield _get_user_data


@pytest.fixture(scope="function")
def get_user():
    def _get_user(**kwargs):
        if kwargs:
            func = User.objects.get
        return func(**kwargs)
    yield _get_user


@pytest.fixture(scope="function")
def create_user():
    def _create_user(user_data):
        if 'is_superuser' in user_data and user_data['is_superuser']:
            func = User.objects.create_superuser
        else:
            func = User.objects.create_user
        return func(**user_data)

    yield _create_user


@pytest.fixture(scope="function")
def create_client():
    def _create_client():
        client = APIClient()

        return client

    yield _create_client
