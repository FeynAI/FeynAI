from pydantic import BaseModel

class ModelResponse(BaseModel):
    message: str
    follow_up_question: str = None
    score: int = None