from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session
from utils.db import get_db_session
from utils.auth import get_current_user
from controllers.submit_answer_controller import process_answer
from schemas.response import ModelResponse

router = APIRouter(prefix="/submit-answer", tags=["Submit Answer"])

@router.post("/", response_model=ModelResponse)
async def submit_answer(
    input: UploadFile = File(None),  # File input (optional)
    input_text: str = Form(None),   # Text input (optional, mutually exclusive with `input`)
    session_id: str = Query(..., description="Session ID"),
    topic: str = Query(..., description="Topic of the session"),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db_session),
):
    # Ensure one and only one type of input is provided
    if not (input or input_text):
        raise HTTPException(status_code=400, detail="Either input file or text must be provided.")
    if input and input_text:
        raise HTTPException(status_code=400, detail="Provide either input file or text, not both.")
    
    # Delegate processing
    input_data = input if input else input_text
    return await process_answer(input_data, session_id, topic, current_user, db)
