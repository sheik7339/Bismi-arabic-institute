#!/usr/bin/env bash
# start.sh — Render start script
set -o errexit

echo "--- Bismi Academy: Running Migrations ---"
python manage.py migrate --noinput

echo "--- Bismi Academy: Starting Gunicorn ---"
gunicorn core.wsgi:application
