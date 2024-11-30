from pydantic import BaseModel

class AudioResponse(BaseModel):
    message: str
    follow_up_question: str = None

class TextResponse(BaseModel):
    message: str
    follow_up_question: str = None
