#!/bin/bash

# Variables
SERVER_USER="mdg05"
SERVER_IP="192.168.1.47"
REMOTE_DIR="/home/$SERVER_USER/wedding-app"
LOCAL_DIR="$(pwd)"

echo "Starting deployment to $SERVER_USER@$SERVER_IP..."

# Step 1: Archive the project files excluding node_modules and .next
echo "Creating project archive..."
tar --exclude='node_modules' --exclude='.next' --exclude='deploy.sh' -czf wedding-app.tar.gz .

# Step 2: Create remote directory if it doesn't exist
echo "Creating remote directory if not exists..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

# Step 3: Copy archive to remote server
echo "Copying archive to remote server..."
scp wedding-app.tar.gz $SERVER_USER@$SERVER_IP:$REMOTE_DIR/

# Step 4: SSH into server and deploy
echo "Connecting to remote server to deploy..."
ssh $SERVER_USER@$SERVER_IP << EOF
  set -e
  echo "Extracting project files..."
  cd $REMOTE_DIR
  tar -xzf wedding-app.tar.gz
  rm wedding-app.tar.gz

  echo "Building and starting Docker container..."
  docker-compose down || true
  docker-compose build
  docker-compose up -d

  echo "Deployment complete. App should be running on port 3000."
EOF

# Step 5: Cleanup local archive
rm wedding-app.tar.gz

echo "Deployment script finished."
