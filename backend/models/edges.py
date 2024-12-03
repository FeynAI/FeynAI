from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from utils.db import Base

    

class Edges(Base):
    """
    Represents an edge in a conversation graph.
    An edge connects two nodes in a conversation.

    Attributes:
        id (int): The primary key of the edge.
        conversation_id (str): The ID of the conversation this edge belongs to.
        parent_id (int): The ID of the parent node in the edge.
        child_id (int): The ID of the child node in the edge.
        conversation (Conversation): The conversation this edge is associated with.
    """
    __tablename__ = "edges"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(String, ForeignKey("conversation.id"), nullable=False)
    parent_id = Column(Integer, ForeignKey("nodes.id"))
    child_id = Column(Integer, ForeignKey("nodes.id"))

    conversation = relationship("Conversation", back_populates="edges")
    