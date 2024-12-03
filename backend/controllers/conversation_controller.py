from sqlalchemy.orm import Session
from utils.llm import get_initial_question
# from utils.chat_history_service import save_chat_message
from models.conversation import Conversation
from models.user import User
from fastapi import HTTPException

def init_new_conversation(topic: str, current_user: User, db: Session) -> int:
    """
    Initialize a new conversation with the given topic and user.

    Args:
        topic (str): The topic of the new conversation.
        current_user (User): The user who is initiating the conversation.
        db (Session): The database session to use for committing the new conversation.

    Returns:
        int: The ID of the newly created conversation.
    """
    new_conversation = Conversation(
            user_id=current_user.id,
            topic=topic
        )
    conversation_id=new_conversation.id
    db.add(new_conversation)
    db.commit()
    return conversation_id

async def start_new_conversation(topic: str, current_user: User, db: Session) -> dict:
    """
    Starts a new conversation for the user, this means initializing a new conversation in the database and generating the first question.

    Args:
        topic (str): The topic for the new learning session.
        current_user: The current user starting the session.
        db (Session): The database session to use for saving the new session.

    Returns:
        dict: A dictionary containing a success message, the session ID, and the initial question.

    Raises:
        HTTPException: If the initial question generation fails or if there is an error saving the session to the database.
    """

    initial_question = get_initial_question(topic)
    if not initial_question:
        raise HTTPException(
            status_code=500,
            detail="Failed to generate an initial question. Please try again later."
        )
    try:
        conversation_id = init_new_conversation(topic, current_user, db)

        return {
            "message": "Conversation started successfully.",
            "session_id": conversation_id,
            "question": initial_question,
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to start conversation: {e}")

async def get_all_conversations(current_user, db: Session):
    """
    Retrieve all conversations for the currently logged-in user.
    """
    try:
        sessions = db.query(Conversation).filter(
            Conversation.user_id == current_user.id
        ).all()
        

        return [{"id": session.id, "topic": session.topic} for session in sessions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch sessions: {e}")


# TODO: function to update conversation, (add a node and add the according edge, remove a node, perhaps editing a node)