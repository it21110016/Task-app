# 📝 TaskApp

A full-stack task management application built with:

- 🌐 **Frontend**: Vite + React + TypeScript  
- 🔙 **Backend**: Node.js + Express + TypeScript  
- 🛢️ **Database**: MariaDB (via Docker)  
- 🐳 **Dockerized** for seamless development and deployment  


## 📁 Project Structure

```bash
TaskApp/
├── backend/ # Express backend (TypeScript)
├── frontend/ # Vite + React frontend (TypeScript)
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

Make sure Docker is installed on your system.

Clone the repository:

```bash
git clone https://github.com/it21110016/Task-app.git
cd Task-app
```

## ⚙️ Running with Docker

Run all services (frontend, backend, DB) using Docker:

```sh
docker-compose up --build
```

This will:
- Build frontend & backend images
- Start containers for frontend, backend, and MariaDB

Access the app in your browser at:
👉 http://localhost:5173

## 🧪 Running Tests

### Frontend
```sh
cd frontend
npm install
npm test
```

### Backend
```sh
cd backend
npm install
npm test
```
