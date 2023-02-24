"""TBI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path
from django.conf.urls import include


def construct_urlpattern(path_suffix, path_prefix=os.environ.get('BACKEND_PREFIX_URL'), **kwargs):
    # url path versioning - use different directories for different versions
    return path(path_prefix + path_suffix, **kwargs)


def construct_local_app_urlpattern(app_name, view=lambda app_name: include(f'{app_name}.urls')):
    return construct_urlpattern("/" + app_name + '/', view=view(app_name))


urlpatterns = [
    path('admin/', admin.site.urls),
    construct_local_app_urlpattern('search'),
]
