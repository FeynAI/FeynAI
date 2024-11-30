from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.user import User
from models.chat_history import ChatHistory
from routers import auth, submit_answer, session,  leaderboard
from utils.db import engine, Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(submit_answer.router)
app.include_router(session.router)
app.include_router(leaderboard.router)

# Default health check endpoint
@app.get("/", tags=["Health"])
async def health_check():
    return {"status": "ok", "message": "The server is running and healthy!"}