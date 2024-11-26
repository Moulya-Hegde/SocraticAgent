#!/bin/bash

echo "Starting frontend..."
cd frontend
npm install
npm start > ../frontend.log 2>&1 &

# Navigate to the backend directory and start the Flask server
echo "Starting backend..."
cd ../backend
source vsenv/Scripts/activate   # Activate virtual environment (adjust if needed)
pip install -r requirements.txt
export FLASK_APP=app.py
export FLASK_ENV=development
export PYTHONUNBUFFERED=1  # Ensures immediate output for print statements

# Run Flask and capture output
flask run > ../backend.log 2>&1 &

echo "Both frontend and backend servers are running!"
echo "Check frontend.log and backend.log for output."
