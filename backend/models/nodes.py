from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from utils.db import Base

class Nodes(Base):
    """
    Represents the nodes that compose a conversation.
    Each node has a question, an answer, and a timestamp except for the root node.
    The root node has no question, answer, or timestamp.
    To know the relationship between nodes, we need to look at the edges (see below).
    
    Attributes:
        id (int): The primary key of the node.
        conversation_id (str): The foreign key linking to the conversation.
        node_id (int): The identifier of the node.
        question (str): The question associated with the node.
        answer (str): The answer associated with the node.
        time (datetime): The timestamp of the node.

    Relationships:
        conversation (Conversation): The relationship to the Conversation model.
    """
    
    __tablename__ = "nodes"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(String, ForeignKey("conversation.id"), nullable=False)
    node_id = Column(Integer, nullable=False)
    question = Column(String)
    answer = Column(String)
    time = Column(DateTime, nullable=False)
    
    conversation = relationship("Conversation", back_populates="nodes")
    