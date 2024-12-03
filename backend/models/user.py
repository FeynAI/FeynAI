from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from utils.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    # Each user has multiple Conversation
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")