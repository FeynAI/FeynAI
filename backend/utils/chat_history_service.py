from models.chat_history import ChatHistory
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import time

def save_chat_message(db: Session, user_id: int, session_id: str, role: str, message: str):
    """
    Save a chat message to the database.
    """
    chat_entry = ChatHistory(
        user_id=user_id,
        session_id=session_id,
        role=role,
        message=message,
        timestamp=datetime.fromtimestamp(time.time(), tz=timezone.utc)
    )
    db.add(chat_entry)
    db.commit()

def get_chat_history(db: Session, session_id: str, user_id: int):
    """
    Retrieve all chat messages for a given session ID and user ID.
    """
    return (
        db.query(ChatHistory)
        .filter(ChatHistory.session_id == session_id, ChatHistory.user_id == user_id)
        .order_by(ChatHistory.timestamp)
        .all()
    )

def get_last_message(db: Session, session_id: str, role: str):
    """
    Retrieve the last message from a specific role ('user' or 'assistant') in a session.
    """
    return (
        db.query(ChatHistory)
        .filter(ChatHistory.session_id == session_id, ChatHistory.role == role)
        .order_by(ChatHistory.timestamp.desc())
        .first()
    )
