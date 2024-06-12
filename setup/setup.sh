#!/bin/bash

# Pulling Base Images
docker pull postgres:alpine -q
docker pull node:20-alpine -q

# Build the Docker image for the app
docker build -t bitespeed-app-image ../app 
docker build -t bitespeed-db-image ../db

# Check the exit status of the image build
if [ $? -eq 0 ]; then
    echo "Image build successful. Starting Docker Compose..."
    docker-compose up -d

    # Check the exit status of Docker Compose
    if [ $? -eq 0 ]; then
        echo "Docker Compose started successfully. "
        exit 0
    else
        echo "Error: Docker Compose failed to start."
        exit 1
    fi
else
    echo "Error: Image build failed. Exiting..."
    exit 1
fi