#!/bin/bash
NAME=$1
MODE=$2

modify_xml() {

  # Modificar el valor de la etiqueta
  sed  "s|<title>WEB_NAME</title>|<title>$WEB_NAME</title>|" src/index.html.tpl > src/index.html

}

if [[ -d src/assets/$NAME ]]; then
  cp src/assets/$NAME/* src/assets/
  cp src/assets/$NAME/projects/src/* src/assets/
  source src/assets/config.env
  modify_xml
  if [[ $MODE == "PRO" ]]; then
    ng build --configuration production  
  else
    ng serve -o
  fi
fi

