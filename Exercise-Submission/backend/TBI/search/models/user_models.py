from uuid import uuid4
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('status', User.UserState.ACTIVE)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('status', User.UserState.ACTIVE)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    USERNAME_FIELD = 'email'
    objects = UserManager()

    class UserState(models.TextChoices):
        ACTIVE = 'ACTIVE', 'ACTIVE'
        INACTIVE = 'INACTIVE', 'INACTIVE'

    date_created = models.DateTimeField(auto_now_add=True)

    date_updated = models.DateTimeField(auto_now=True)

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    status = models.CharField(
        max_length=255, choices=UserState.choices, default=UserState.ACTIVE)

    is_superuser = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)

    email = models.EmailField(unique=True, max_length=255)

    first_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name=u"User First Name")

    last_name = models.CharField(
        max_length=100, blank=True, null=True, verbose_name=u"User Last Name")

    tasks = models.ManyToManyField(
        "Task", blank=True, default=None, through="UserTask")

    def __str__(self):
        return f"""{self.email} {self.first_name} {self.last_name}"""

    class Meta:
        db_table = "user"
