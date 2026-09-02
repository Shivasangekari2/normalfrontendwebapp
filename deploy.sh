#!/bin/bash

APP_DIR="/var/www/retailstore"
PORT=80

echo "Stopping any existing server on port $PORT..."
sudo fuser -k $PORT/tcp 2>/dev/null || true

echo "Copying files..."
sudo mkdir -p $APP_DIR
sudo cp -r index.html style.css app.js $APP_DIR/

echo "Starting server on port $PORT..."
cd $APP_DIR
nohup sudo python3 -m http.server $PORT > /tmp/retailstore.log 2>&1 &

echo "Done! App running at http://<EC2-PUBLIC-IP>"
