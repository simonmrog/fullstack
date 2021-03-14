echo "$ENVIRONMENT"
if [ "$ENVIRONMENT" == "dev" ]; then
  npm run dev
elif [ "$ENVIRONMENT" == "prod" ]; then
  npm start
else echo "[ERROR] Unknown environment value. Application stopped"
fi
