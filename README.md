# 🚚 GenLogs

![CI/CD Pipeline](https://github.com/carlosrincon17/genlogs-demo/actions/workflows/ci.yml/badge.svg)



---

## 🛠️ Tech Stack

We use a modern, robust stack to ensure performance and developer experience:

-   **Frontend**: `React`, `Vite`, `TailwindCSS`
-   **Backend**: `FastAPI` (Python), `uv` (Package Manager)
-   **Infrastructure**: `Docker`, `Docker Compose`, `AWS` (EC2, S3, ECR)

---

## 🚀 Running Locally with Docker

Getting started is easy! We use Docker Compose to spin up the entire stack with a single command.

### Prerequisites
-   [Docker](https://docs.docker.com/get-docker/) installed on your machine.

### Steps

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/carlosrincon17/genlogs-demo
    cd genlogs-demo
    ```

2.  **Start the Application**:
    Run the following command from the root directory:
    ```bash
    docker-compose -f infra/docker-compose.yml up --build
    ```

3.  **Access the App**:
    -   **Frontend**: Open [http://localhost](http://localhost) (runs on port 80).
    -   **Backend API**: Open [http://localhost:8000](http://localhost:8000) (runs on port 8000).
    -   **API Docs**: Check out [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger UI.

---

## 📂 Project Structure

-   `api/`: Backend services built with FastAPI.
-   `frontend/`: Frontend application built with React/Vite.
-   `infra/`: Infrastructure files (including Dockerfiles and CI/CD).
