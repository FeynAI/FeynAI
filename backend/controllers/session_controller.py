from sqlalchemy.orm import Session
from utils.llm import get_follow_up_question
from utils.session_service import create_session_id
from utils.chat_history_service import save_chat_message
from models.session import Session as SessionModel
from fastapi import HTTPException

async def start_new_session(topic: str, current_user, db: Session):
    """
    Handles starting a new learning session for the user.
    """
    # Generate a unique session ID
    session_id = create_session_id()

    # Generate the initial question
    initial_question = get_follow_up_question(None, topic)
    if not initial_question:
        raise HTTPException(
            status_code=500,
            detail="Failed to generate an initial question. Please try again later."
        )

    # Save session details to the database
    try:
        new_session = SessionModel(
            id=session_id,
            user_id=current_user.id,
            topic=topic,
            score=0  # Initialize with 0 score
        )
        db.add(new_session)
        db.commit()

        # Save the initial question to the chat history
        save_chat_message(
            db=db,
            user_id=current_user.id,
            session_id=session_id,
            role="assistant",
            message=initial_question,
        )

        return {
            "message": "Session started successfully.",
            "session_id": session_id,
            "question": initial_question,
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to start session: {e}")
