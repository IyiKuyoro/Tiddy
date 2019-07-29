#!/bin/bash

# This script helps Move Ambient Types (mat) into the node_modules after once instalation runs.

# Check that there is a node modules folder
export NODE_ENV=production

npm run setup && npm run migrate
