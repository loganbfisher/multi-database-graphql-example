#! /bin/bash

# Build docker images.
for var in "$@"
do
  echo "Building $var..."
  docker build -t quay.io/parkhubprime/$var:latest ./$var
done

# Push docker images to quay.
# Login to Quay
docker login -e "." -u "$QUAY_USERNAME" -p "$QUAY_PASSWORD" quay.io

for var in "$@"
do
  echo "Pushing to quay.io $var..."
  docker push quay.io/parkhubprime/$var:latest
done

export KUBECONFIG=/Users/loganfisher/Documents/configs/production/kubeconfig
echo "Kube Config set..."

kubectl delete -f ./$var/config/deployment.yml
echo "$var deployment deleted..."

kubectl create -f ./$var/config/deployment.yml
echo "$var deployment created..."
