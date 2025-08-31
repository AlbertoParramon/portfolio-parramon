#!/bin/bash
NAME=$1

if [[ -d src/assets/$NAME ]]; then
  cp src/assets/$NAME/* src/assets/
  ng serve -o
fi

