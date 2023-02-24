#!/bin/bash

MANAGE_PY='/backend/TBI/manage.py'

MANAGEMENT_COMMANDS=(
  "python3 $MANAGE_PY initialize_database"
  "echo DONE"
)

while ! nc -z $DATABASE_HOST $DATABASE_PORT; do echo "Database loading"; sleep .5; done && python3 $MANAGE_PY makemigrations && python3 $MANAGE_PY migrate && DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER_PASSWORD DJANGO_SUPERUSER_USERNAME=$DJANGO_SUPERUSER_USERNAME DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER_EMAIL python3 $MANAGE_PY createsuperuser --no-input;
# Set ENABLE_MANAGEMENT_COMMANDS to true to enable management commands
if [[ $ENABLE_MANAGEMENT_COMMANDS == true ]]; then
  for command in "${MANAGEMENT_COMMANDS[@]}"; do
    $command;
  done
fi
python3 $MANAGE_PY runserver 0.0.0.0:$DJANGO_PORT;
