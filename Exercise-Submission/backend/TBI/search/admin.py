from django.contrib import admin

from .models import User, Task


class Admin(admin.ModelAdmin):
    readonly_fields = ('id',)


admin.site.register(User, Admin)
admin.site.register(Task, Admin)
