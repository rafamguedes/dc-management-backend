#!/bin/bash
set -e

echo "🚀 Starting Railway deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:migrate

# Run database seeders
echo "🌱 Running database seeders..."
npm run db:seed

# Start the server
echo "🚀 Starting server..."
npm start
