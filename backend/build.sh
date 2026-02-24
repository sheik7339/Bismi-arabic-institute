#!/usr/bin/env bash
# build.sh — Render build script
set -o errexit

python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate --noinput
chmod +x start.sh

