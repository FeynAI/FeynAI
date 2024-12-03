# src/routes/session.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from utils.auth import get_current_user
from utils.db import get_db_session
from controllers.conversation_controller import start_new_conversation, get_all_conversations
from models.conversation import Conversation

# TODO: replace session by conversation in frontend

# Create a router for session-related endpoints
router = APIRouter(prefix="/sessions", tags=["Sessions"])

# Define a Pydantic model for the input to start a session
class StartSessionRequest(BaseModel):
    topic: str

@router.post("/start-session")
async def start_conversation(
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
    result = await start_new_conversation(request.topic, current_user, db)
    return result

@router.get("/")
async def list_conversations(
    current_user=Depends(get_current_user),  # Get the currently authenticated user
    db: Session = Depends(get_db_session),  # Get the database session
):
    """
    Retrieve all conversations for the current user.
    """
    try:
        conversations = await get_all_conversations(current_user, db)
        return {"sessions": conversations}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

# TODO: no more first question, start_conversation should return the first question
@router.get("/{session_id}/first-question")
async def get_first_question(session_id: str, db: Session = Depends(get_db_session)):
    """
    Placeholder endpoint to retrieve the first question for a given session.
    """
    # Retrieve the first question from the chat history
    first_question = "First question placeholder"

    return {"question": first_question}
