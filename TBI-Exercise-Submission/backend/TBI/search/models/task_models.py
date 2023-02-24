from uuid import uuid4
from django.db import models
from .user_models import User


class Task(models.Model):

    class TaskState(models.TextChoices):
        INCOMPLETE = 'INCOMPLETE', 'INCOMPLETE'
        COMPLETE = 'COMPLETE', 'COMPLETE'

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    date_created = models.DateTimeField(auto_now_add=True)

    date_updated = models.DateTimeField(auto_now=True)

    title = models.TextField(blank=True, default=None, null=True)

    body = models.TextField(blank=True, default=None, null=True)

    status = models.CharField(max_length=255,
                              choices=TaskState.choices, default=TaskState.INCOMPLETE)

    assignees = models.ManyToManyField(
        User, blank=True, default=None, through="UserTask")

    def __str__(self):
        return f"{self.status} {self.title}"

    class Meta:
        db_table = "task"


class UserTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    # when the user was assigned
    date_created = models.DateTimeField(auto_now_add=True)

    date_updated = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, to_field='id')

    task = models.ForeignKey(
        Task, default=None, null=True, on_delete=models.DO_NOTHING, to_field='id')

    def __str__(self):
        return f"{self.user.email[:40]} {self.task.title[:40]}"

    class Meta:
        db_table = "user_task"
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "user",
                    "task",
                ], name='unique_user_task'
            )
        ]
