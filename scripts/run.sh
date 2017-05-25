#! /bin/bash

for var in "$@"
do
  echo "Testing $var..."
  cd ./$var
  npm install
  npm test
  #docker-compose run $var npm test
done
