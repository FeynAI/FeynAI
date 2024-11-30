from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from utils.auth import get_current_user
from utils.db import get_db_session
from controllers.session_controller import start_new_session

router = APIRouter(prefix="/sessions", tags=["Sessions"])

# Define a Pydantic model for the input
class StartSessionRequest(BaseModel):
    topic: str

@router.post("/start-session")
async def start_session(
    request: StartSessionRequest,  # Use the Pydantic model to parse the body
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db_session),
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
