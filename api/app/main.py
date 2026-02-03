from app.api.v1 import carriers

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes, allow all. In prod, specify frontend origin.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(carriers.router, prefix="/api/v1/carriers", tags=["carriers"])

@app.get("/")
def read_root():
    return {"message": "GenLogs API is running"}
