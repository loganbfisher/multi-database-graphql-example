#! /bin/bash

# Push docker images to quay.
# Login to Quay
docker login -e "." -u "$QUAY_USERNAME" -p "$QUAY_PASSWORD" quay.io

for var in "$@"
do
  echo "Pushing to quay.io $var..."
  docker push quay.io/parkhubprime/$var:latest
done
