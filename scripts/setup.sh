#!/bin/bash

# Sets up your develeopment environment

# Add script run permission
chmod u+x ./scripts/mat.sh || echo "Could not set permission on mat.sh"
chmod u+x ./scripts/cev.sh || echo "Could not set permission on cev.sh"

# Scripts to run
./scripts/mat.sh
./scripts/cev.sh

exit 0
