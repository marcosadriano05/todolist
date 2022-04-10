#!/bin/bash

if [ $1 == "test" ];
then
  if [ $2 == "integration" ];
  then
    export INTEGRATION_TEST_ENEABLED=true
    deno test --allow-env --allow-net ../
  else
    export INTEGRATION_TEST_ENEABLED=false
    deno test --allow-env --allow-net ../
  fi
fi
