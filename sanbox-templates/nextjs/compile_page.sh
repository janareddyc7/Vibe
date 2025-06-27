#!/bin/bash

# This script runs during building the sandbox template
# and makes sure the Next.js app is (1) running and (2) the `/` page is compiled

function ping_server() {
    counter=0
    response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
    while [[ ${response} -ne 200 ]]; do
        let counter++
        if (( counter % 20 == 0 )); then
            echo "Waiting for server to start..."
        fi
        sleep 0.1
        response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
    done
    echo "Server is ready!"
}

# Start Next.js dev server in background
cd /home/user && npx next dev --turbopack &

# Wait for server to be ready
ping_server

echo "Next.js server is running and ready!"