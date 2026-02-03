from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import carriers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(carriers.router, prefix="/api/v1/carriers", tags=["carriers"])

@app.get("/")
def read_root():
    return {"message": "GenLogs API is running"}
