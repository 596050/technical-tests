import os
import random
from random import choice
from faker import Faker
from django.core.management.base import BaseCommand
from search.models import User, Task, UserTask


def get_random_instance(instance):
    pks = instance.objects.values_list('pk', flat=True)
    random_pk = choice(pks)
    random_obj = instance.objects.get(pk=random_pk)
    return random_obj


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fake = Faker()
        self.DJANGO_SUPERUSER_USERNAME = os.environ.get(
            'DJANGO_SUPERUSER_USERNAME')
        self.DJANGO_SUPERUSER_EMAIL = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        self.DJANGO_SUPERUSER_PASSWORD = os.environ.get(
            'DJANGO_SUPERUSER_PASSWORD')

    def create_mock_tasks(self, num=10):
        try:
            for _ in range(num):
                data = dict(
                    title=self.fake.paragraph(
                        nb_sentences=random.randint(5, 10)),
                    body=self.fake.paragraph(
                        nb_sentences=random.randint(5, 40)),
                    status=random.choice(
                        [Task.TaskState.INCOMPLETE, Task.TaskState.COMPLETE])
                )
                o = Task.objects.create(**data)
                o.save()
            # To test edge cases
            edge_case_data = dict(
                title=" ",
                body=" ",
            )
            o = Task.objects.create(**edge_case_data)
            o.save()
        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f'create_mock_tasks Exception {repr(e)}'))

    def create_mock_users(self, num=10):
        try:
            for _ in range(num):
                user_data = dict(
                    email=self.fake.email(),
                    password=self.DJANGO_SUPERUSER_PASSWORD,
                    is_superuser=False,
                    first_name=self.fake.first_name(),
                    last_name=self.fake.last_name(),
                    status=random.choice(
                        [User.UserState.ACTIVE, User.UserState.INACTIVE])
                )
                User.objects.create_user(**user_data)
            # To test edge cases
            edge_case_data = dict(
                email=" ",
                password=" ",
                is_superuser=False,
                first_name=" ",
                last_name=" ",
            )
            User.objects.create_user(**edge_case_data)
        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f"create_mock_users Exception {repr(e)}"))

    def create_mock_task_assignments(self, num_tasks=3):
        try:
            users = User.objects.all()
            for user in users:
                for _ in range(0, random.randint(0, num_tasks)):
                    o, is_created = UserTask.objects.get_or_create(user=user,
                                                                   task=get_random_instance(Task))
                    if not is_created:
                        o.save()

        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f"create_mock_task_assignments Exception {repr(e)}"))

    def handle(self, *args, **options):
        self.create_mock_users()
        self.create_mock_tasks()
        self.create_mock_task_assignments()
