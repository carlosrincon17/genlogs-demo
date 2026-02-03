# GenLogs

This repository contains the source code for the GenLogs application, featuring a modern web frontend and a robust backend API.

## Technology Stack

The project utilizes the following technologies to ensure performance, scalability, and developer experience:

-   **Frontend**: React, Vite, TailwindCSS
-   **Backend**: FastAPI (Python), uv (Package Manager)
-   **Infrastructure**: Docker, Docker Compose, AWS (EC2, S3, ECR)

## Local Development

You can run the entire application stack locally using Docker Compose.

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/) installed on your machine.

### Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/carlosrincon17/genlogs-demo
    cd genlogs-demo
    ```

2.  **Start the Application**:
    Run the following command from the root directory:
    ```bash
    docker-compose -f infra/docker-compose.yml up --build
    ```

3.  **Access the Application**:
    -   **Frontend application**: [http://localhost](http://localhost)
    -   **Backend API**: [http://localhost:8000](http://localhost:8000)
    -   **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Database Schema

The application uses a relational database with PostGIS extensions for geospatial support.

-   **carriers**: Stores legal entity information (USDOT number, name).
-   **trucks**: Physical assets linked to carriers.
-   **plates**: Historical and current license plate information.
-   **cameras**: Hardware locations with geospatial coordinates.
-   **detections**: High-volume event logs capturing vehicle detections.

## Project Structure

-   `api/`: Backend services built with FastAPI.
-   `frontend/`: Frontend application built with React/Vite.
-   `infra/`: Infrastructure configuration files (Dockerfiles, Docker Compose, etc.).
