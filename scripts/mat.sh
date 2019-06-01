#!/bin/bash

# This script helps Move Ambient Types (mat) into the node_modules after once instalation runs.

# Check that there is a node modules folder
if [[ ! -d "$(pwd)/node_modules" ]]; then
  echo "Directory $(pwd)/node_modules DOES NOT exists."
  echo "Please ensure you have run npm install first."
  exit 1
fi

# Check that there is a types folder created or try to create it
if [[ ! -d "$(pwd)/node_modules/@types" ]]; then
  echo "Creating  @types in $(pwd)/node_modules."
  if [ mkdir "$(pwd)/node_modules/@types" ]; then
    echo "Created @types in $(pwd)/node_modules."
  else
    echo "Could not create @types in $(pwd)/node_modules."
    exit 1
  fi
fi

# Copy Ambient type declarations to node_modules/@types
for f in $(pwd)/@types/*; do
  echo "${f##*/}"

  if cp -av $(pwd)/@types/${f##*/} $(pwd)/node_modules/@types; then
    echo "Copied $(pwd)/@types/${f##*/} to $(pwd)/node_modules/@types"
  else
    echo "Could not copy $(pwd)/@types/${f##*/}"
    exit 1
  fi
done

exit 0
