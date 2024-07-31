#!/bin/bash

# Fichier JSON
JSON_FILE="./public/locales/en/menu.json"

# Clé et token i18nexus
NS="default"
KEY="kbzdpCsdyx6umbgK8fUKFw"
TOKEN="d0ac891e-303d-442c-854f-7b9273fb9f39"

# Lire chaque paire clé/valeur du fichier JSON et exécuter la commande i18nexus
jq -r 'to_entries[] | "\(.key) \(.value)"' "$JSON_FILE" | while read -r key value; do
  echo "Exécution de : i18nexus a -K \"$key\" -v \"$value\" -ns \"$NS\" -k \"$KEY\" -t \"$TOKEN\""
  i18nexus a -K "$key" -v "$value" -ns "$NS" -k "$KEY" -t "$TOKEN"
done