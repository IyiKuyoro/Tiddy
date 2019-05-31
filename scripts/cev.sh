#!/bin/bash

# This script helps create your local version of the environment varaibles

# check if env already exisits
if [[ -d $(pwd)/.env ]]; then
  echo ".env already exists"
  exit 0
fi

# Create the env file
if touch $(pwd)/.env; then
  echo "$(pwd)/.env created"
else
  echo "Could not create $(pwd)/.env"
  exit 1
fi

# Copy environment variable samples into env file
if cat $(pwd)/.env.sample >> $(pwd)/.env; then
  echo "Copied .env.sample to .env"
else
  echo "Could not copy .env.sample to .env"
  exit 1
fi

exit 0
