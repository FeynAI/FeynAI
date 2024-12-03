from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from utils.db import Base
import uuid

class Conversation(Base):
    """
    Represents a conversation in the system.
    Attributes:
        id (str): Unique identifier for the conversation, generated using UUID4.
        user_id (int): Foreign key referencing the ID of the user associated with the conversation.
        topic (str): Topic of the conversation.
        created_at (datetime): Timestamp when the conversation was created, defaults to the current UTC time.
        updated_at (datetime): Timestamp when the conversation was last updated, defaults to the current UTC time and updates on modification.
        user (User): Relationship to the User model, representing the user associated with the conversation.
    """
    __tablename__ = "Conversation"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    topic = Column(String)  # Topic for the conversation

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc)) 
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))  # Updated
    
    nodes = relationship("Nodes", back_populates="conversation", cascade="all, delete-orphan")
    edges = relationship("Edge", back_populates="conversation", cascade="all, delete-orphan")
    
    user = relationship("User", back_populates="conversation")
