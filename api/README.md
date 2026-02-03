# GenLogs API

This directory contains the backend service for GenLogs, built with Python and FastAPI.

## Overview

The API provides endpoints for managing carriers, trucks, and analyzing detection data. It handles business logic, database interactions, and geospatial queries.

## Key Features

-   **RESTful API**: Standardized endpoints for resource management.
-   **Geospatial Queries**: Route analysis and location-based filtering.
-   **High Performance**: Built on FastAPI for speed and efficiency.

## Development

To run the API locally:

```bash
uv run fastapi dev app/main.py
```

The API will be available at `http://localhost:8000`. Documentation can be accessed at `/docs`.
