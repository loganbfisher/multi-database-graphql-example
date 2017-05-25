#! /bin/bash

# Build docker images.
for var in "$@"
do
  echo "Building $var..."
  docker build -t quay.io/parkhubprime/$var:latest ./$var
done
