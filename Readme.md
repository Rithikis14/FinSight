# FinSight: Privacy-First Investment Intelligence

**FinSight** is a production-grade full-stack investment management system. It provides institutional-level portfolio insights using a local **RAG (Retrieval-Augmented Generation)** pipeline. By running LLMs locally via **Ollama**, FinSight ensures your sensitive financial data never leaves your machine.

---

## 🏗️ Project Structure

```text
FinSight/
├── backend/                # Spring Boot (Java 21)
│   ├── src/main/java       # Source code (Controller-Service-Repository)
│   ├── src/main/resources  # Configuration (application.yml)
│   └── pom.xml             # Maven dependencies (Spring AI, JPA, Security)
├── frontend/               # React (Vite)
│   ├── src/                # Components, Pages, and Hooks
│   ├── tailwind.config.js  # Design & Dark Mode config
│   └── package.json        # Frontend dependencies (Framer Motion, Lucide)
└── README.md
```

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Framer Motion (Animations), Lucide React (Icons).
* **Backend:** Spring Boot 3.4+, Spring AI, Spring Security (JWT).
* **Database:** PostgreSQL with **pgvector** extension.
* **AI Engine:** Ollama (Llama 3 / Mistral) running locally.

---

## 🚀 Getting Started

### Prerequisites
* **Java 21** and **Maven** installed.
* **Node.js** (v18+) and **npm**.
* **PostgreSQL** installed and running.
* **Ollama** installed.

### Step 1: Set up the AI (Ollama)
Download and pull the model you wish to use:
```bash
ollama pull llama3
```

### Step 2: Set up the Database
1. Create a database named `wealthai_db`.
2. Enable the vector extension:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Step 3: Configure & Run Backend
1. Update `backend/src/main/resources/application.yml` with your PostgreSQL credentials.
2. Run the backend:
```bash
cd backend
mvn spring-boot:run
```

### Step 4: Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Access the app at `http://localhost:5173`.

---

## 🛡️ Security Features
* **Data Sovereignty:** All RAG processing happens locally; no data is sent to OpenAI/Anthropic.
* **JWT Authentication:** Secure stateless sessions for all API calls.
* **Password Hashing:** Industry-standard Bcrypt encoding for user credentials.

---

## 📈 Planned Features
* **Real-time Market Sync:** Integration with financial market APIs for live pricing.
* **Advanced Analytics:** Visualizing asset correlation and sector-wise risk.
* **Export Reports:** Generating AI-driven PDF investment summaries.

---

## 👤 Author
**Rithik V Kumar** *Computer Science Engineering Student | Aspiring SDE & AI Engineer*

---

### Pro-Tip for GitHub
Add a **"How it works"** section with a simple diagram or a GIF of the AI chat in action. Recruiters love seeing that "Local RAG" is more than just a buzzword in your code—seeing the AI reference specific manual entries you made proves the logic works!
