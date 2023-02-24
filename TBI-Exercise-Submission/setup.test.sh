#!/bin/bash

MANAGE_PY='/backend/TBI/manage.py'

while ! nc -z $DATABASE_HOST $DATABASE_PORT; do echo "Database loading"; sleep .5; done && python3 $MANAGE_PY makemigrations && python3 $MANAGE_PY migrate && cd /backend/TBI/ && pytest -vvv -s;