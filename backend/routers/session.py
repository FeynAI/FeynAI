# src/routes/session.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from utils.auth import get_current_user
from utils.db import get_db_session
from controllers.session_controller import start_new_session, get_all_sessions

# Create a router for session-related endpoints
router = APIRouter(prefix="/sessions", tags=["Sessions"])

# Define a Pydantic model for the input to start a session
class StartSessionRequest(BaseModel):
    topic: str

@router.post("/start-session")
async def start_session(
    request: StartSessionRequest,  # Parse the request body
    current_user=Depends(get_current_user),  # Get the currently authenticated user
    db: Session = Depends(get_db_session),  # Get the database session
):
    """
    Start a new session for the user with the given topic.
    """
    # Validate input
    if not request.topic.strip():
        raise HTTPException(status_code=400, detail="Topic cannot be empty.")

    # Delegate to the controller
    result = await start_new_session(request.topic, current_user, db)
    return result

# This endpoint is needed to allow the frontend to fetch session data from the backend, enabling the UI to display available sessions for the user.
@router.get("/")
async def list_sessions(
    current_user=Depends(get_current_user),  # Get the currently authenticated user
    db: Session = Depends(get_db_session),  # Get the database session
):
    """
    Retrieve all sessions for the current user.
    """
    try:
        sessions = await get_all_sessions(current_user, db)
        return {"sessions": sessions}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
