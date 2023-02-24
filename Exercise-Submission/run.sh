#!/bin/bash

COMMAND="/bin/bash /setup.sh" 

if [[ $1 == "test" ]]; then
  COMMAND="/bin/bash /setup.test.sh"
fi

COMMAND=$COMMAND docker-compose -f ./docker-compose.dev.yml up 

# --build

