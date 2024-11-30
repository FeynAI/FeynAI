from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from utils.db import Base
import uuid

class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    topic = Column(String)  # Topic for the session
    score = Column(Integer, default=0)  # Session-specific score
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))  # Updated
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))  # Updated

    user = relationship("User", back_populates="sessions")
    chat_histories = relationship("ChatHistory", back_populates="session", cascade="all, delete-orphan")
