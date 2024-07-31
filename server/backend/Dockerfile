# server/backend/Dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", ":8000", "backend.wsgi:application"]
