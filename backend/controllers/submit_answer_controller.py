from fastapi import UploadFile
from typing import Union
from utils.groq import transcribe_audio
from utils.llm import check_answer, generate_ideal_answer, get_follow_up_question
from utils.chat_history_service import save_chat_message, get_last_message, get_chat_history
from utils.formatting import format_history
from sqlalchemy.orm import Session
from schemas.response import AudioResponse
from models.session import Session as SessionModel
import os
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)
logger.setLevel(level=logging.DEBUG)

#set logger to 

async def process_answer(
    input: Union[str, UploadFile],
    session_id: int,
    topic: str,
    current_user,
    db: Session,
):
    
    logger.debug("Processing answer started")
    logger.debug(f"Received session_id: {session_id}, topic: {topic}, input type: {type(input)}")
    
    logger.debug("Processing answer started")
    logger.debug(f"Received session_id: {session_id}, topic: {topic}, input type: {type(input)}")
    
    if isinstance(input, str):
        user_answer = input
    elif True:#isinstance(input, UploadFile)
        temp_file_path = "temp_audio.wav"
        try:
            contents = await input.read()
            with open(temp_file_path, "wb") as f:
                f.write(contents)
            user_answer = transcribe_audio(temp_file_path)
        except Exception as e:
            raise ValueError(f"Error processing audio file: {e}")
        finally:
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)
    else:
        raise ValueError("Invalid input type. Expected an audio file or text string.")

    # Save user answer and calculate score
    save_chat_message(db, current_user.id, session_id, "user", user_answer)
    last_question = get_last_message(db, session_id, "assistant").message
    ideal_answer = generate_ideal_answer(last_question)
    score = check_answer(user_answer, ideal_answer)

    # Update session score
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if not session:
        raise ValueError(f"Session with ID {session_id} not found.")
    session.score += score
    db.commit()

    # Determine response
    if score < 50:
        save_chat_message(db, current_user.id, session_id, "assistant", "If you know, you know.")
        return AudioResponse(message="If you know, you know.")

    chat_history = format_history(get_chat_history(db, session_id))
    next_question = get_follow_up_question(chat_history, topic)
    save_chat_message(db, current_user.id, session_id, "assistant", next_question)
    return AudioResponse(message="Good job!", follow_up_question=next_question)