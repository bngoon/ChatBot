# Chatbot Application Using Django, Vite, and Google Generative AI

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a simple chatbot application built using Django, Vite, and the Google Generative AI API (Gemini). It allows users to interact with an AI-based chatbot through a web interface, providing intelligent responses based on user input. The application uses Clerk for authentication to manage user sessions securely.

## Features

- User-friendly chat interface built with React and Vite
- AI-generated responses using Google Generative AI
- Session management with Clerk authentication
- Containerized deployment with Docker and Docker Compose

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker and Docker Compose**
- **Node.js and npm (or Yarn)**
- **Python 3.8 or higher (optional for local development without Docker)**

## Installation

To install and set up the project, follow these steps:

1. **Clone the Repository:**

git clone https://github.com/yourusername/chatbot.git
cd chatbot

2. **Set Up the Frontend:**

Navigate to the `client` directory and install dependencies using Vite:

cd client
npm install # or yarn install

3. **Environment Variables:**

Create `.env` files for the backend and client with the following environment variables:

**Backend (.env):**

DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 backend
POSTGRES_DB=chatbot
POSTGRES_USER=your-db-user
POSTGRES_PASSWORD=your-db-password
GEMINI_API_KEY=your-gemini-api-key
CLERK_API_KEY=your-clerk-backend-api-key


**Client (.env):**

VITE_CLERK_FRONTEND_API=your-clerk-frontend-api-key


## Usage

To use the chatbot application:

1. **Start Docker Containers:**

In the root directory of your project, start the Docker containers using Docker Compose:

docker-compose up --build

This command will build and run the backend, frontend, and PostgreSQL services.

2. **Access the Application:**

Open your web browser and go to `http://localhost:5173`.

3. **Log In with Clerk:**

Use Clerk authentication to log in and start interacting with the chatbot.

4. **Chat with the Bot:**

Type your message in the chat input box and click "Send". The chatbot will respond with AI-generated text.

## API Endpoints

### `/api/chat/`

- **Method**: `POST`
- **Description**: Sends a message to the AI chatbot and receives a response.
- **Request Body**: JSON

```json
{
 "message": "Your message here"
}

Response: JSON
{
  "response": "AI-generated response"
}

Project Structure
chatbot/
├── server/
│   ├── backend/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   ├── Dockerfile
│   └── .env
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── Chat.jsx
│   ├── vite.config.js
│   ├── package.json
│   ├── yarn.lock
│   └── .env
├── docker-compose.yml
├── requirements.txt
└── README.md

Docker Compose Configuration
Here is the docker-compose.yml setup:
services:
  backend:
    build:
      context: ./server/backend
      dockerfile: Dockerfile
    volumes:
      - ./server/backend:/app
    ports:
      - "8000:8000"
    env_file:
      - ./server/backend/.env
    depends_on:
      - db

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    volumes:
      - ./client:/app
    ports:
      - "5173:5173"
    env_file:
      - ./client/.env
    depends_on:
      - backend

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: chatbot
      POSTGRES_USER: your-db-user
      POSTGRES_PASSWORD: your-db-password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:


  Building and Running Containers
To build and start the containers, run:

docker-compose up --build


License
This project is open-source and available under the MIT License.


### Explanation of Changes

- **Docker Setup Section**: Added detailed instructions on setting up and using Docker, including your `docker-compose.yml` configuration.
- **Environment Variables**: Included specific environment variables for both backend and frontend setups.
- **Installation and Usage**: Updated to reflect the use of Docker for deploying the application.
- **Project Structure**: Updated to include the correct structure of the `server` and `client` directories, as well as Docker-related files.

You can copy and paste this text directly into your `README.md` file. If you need further modifications or have any other questions, feel free to ask!
