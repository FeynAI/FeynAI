import logging
from models.nodes import Nodes
from sqlalchemy.orm import Session
from typing import List

# Configure the logger
logger = logging.getLogger(__name__)

def get_answered_question(db: Session, conversation_id: int) -> List[str]:
    """
    Retrieve the history of already answered questions for a given session.

    Args:
        db (Session): The database session to use for querying the chat history.
        conversation_id (int): The ID of the session to retrieve the chat history for.

    Returns:
        List[str]: A list of chat history entries for the given session.
    """
    nodes = db.query(Nodes).filter(Nodes.conversation_id == conversation_id).all()
    answered_questions = [node.question for node in nodes if node.question is not None] # can be None as the root node has no question
    logger.debug(f"Retrieved {len(answered_questions)} answered questions for conversation {conversation_id}")
    return answered_questions