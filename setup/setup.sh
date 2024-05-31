#!/bin/bash

# Build the Docker image for the app
docker build -t app-image ../app
docker build -t db-image ../db

# Check the exit status of the image build
if [ $? -eq 0 ]; then
    echo "Image build successful. Starting Docker Compose..."
    docker-compose up

    # Check the exit status of Docker Compose
    if [ $? -eq 0 ]; then
        echo "Docker Compose started successfully. "

    else
        echo "Error: Docker Compose failed to start."
        exit 1
    fi
else
    echo "Error: Image build failed. Exiting..."
    exit 1
fi