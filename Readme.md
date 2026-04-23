# FinSight 💰

> **Privacy-first investment intelligence powered by local AI.**

FinSight is a production-grade, full-stack portfolio management platform that delivers institutional-level financial insights — without ever sending your data to the cloud. By running LLMs locally via **Ollama** and a **Retrieval-Augmented Generation (RAG)** pipeline, FinSight guarantees 100% data sovereignty.

---

## ✨ Features

- 🧠 **Local RAG Pipeline** — AI-powered portfolio analysis using locally hosted LLMs (Llama 3 / Mistral)
- 🔒 **Full Data Sovereignty** — No data sent to OpenAI, Anthropic, or any third-party AI service
- 🔐 **JWT Authentication** — Secure, stateless sessions for all API calls
- 🔑 **Password Hashing** — Bcrypt encoding for user credentials
- 📊 **Portfolio Intelligence** — Personalized financial insights from your own investment data
- 🌑 **Dark Mode UI** — Sleek, responsive interface built with Tailwind CSS and Framer Motion

---

## 🏗️ Project Structure

```
FinSight/
├── backend/                   # Spring Boot (Java 21)
│   ├── src/main/java/         # Controller → Service → Repository layers
│   ├── src/main/resources/    # application.yml (config)
│   └── pom.xml                # Maven deps (Spring AI, JPA, Security)
├── frontend/                  # React + Vite
│   ├── src/                   # Components, Pages, Hooks
│   ├── tailwind.config.js     # Design tokens & dark mode
│   └── package.json           # Frontend deps (Framer Motion, Lucide)
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS, Framer Motion, Lucide React |
| **Backend** | Spring Boot 3.4+, Spring AI, Spring Security (JWT) |
| **Database** | PostgreSQL + `pgvector` extension |
| **AI Engine** | Ollama (Llama 3 / Mistral) — runs fully locally |

---

## 🚀 Getting Started

### Prerequisites

- **Java 21** and **Maven**
- **Node.js** v18+ and **npm**
- **PostgreSQL** installed and running
- **Ollama** installed — [get it here](https://ollama.com)

---

### Step 1 — Set up the AI model

Pull your preferred local model:

```bash
ollama pull llama3
# or
ollama pull mistral
```

---

### Step 2 — Set up the Database

Create the database and enable the vector extension:

```sql
CREATE DATABASE wealthai_db;

\c wealthai_db

CREATE EXTENSION IF NOT EXISTS vector;
```

---

### Step 3 — Configure and Run the Backend

1. Update your database credentials in:
   ```
   backend/src/main/resources/application.yml
   ```

2. Start the backend server:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:8080`.

---

### Step 4 — Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app at **[http://localhost:5173](http://localhost:5173)**.

---

## 🛡️ Security

- **Local-only AI processing** — your portfolio data never leaves your machine
- **JWT-based authentication** — stateless, secure API sessions
- **Bcrypt password hashing** — industry-standard credential protection

---

## 📈 Roadmap

- [ ] **Real-time Market Sync** — live pricing via financial market APIs
- [ ] **Advanced Analytics** — asset correlation heatmaps and sector-wise risk breakdown
- [ ] **AI Report Export** — generate downloadable PDF investment summaries

---

## 👤 Author

**Rithik V Kumar**
*Computer Science Engineering Student | Aspiring SDE & AI Engineer*
