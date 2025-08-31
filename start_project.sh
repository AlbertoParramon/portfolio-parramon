#!/bin/bash
NAME=$1
MODE=$2

if [[ -d src/assets/$NAME ]]; then
  cp src/assets/$NAME/* src/assets/
  if [[ $MODE == "PRO" ]]; then
    ng build --configuration production  
  else
    ng serve -o
  fi
fi

