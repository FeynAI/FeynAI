# utils/llm.py

import os
from dotenv import load_dotenv
from groq import Groq
from prompts.check_answer_prompt import get_prompt as get_check_answer_prompt
from prompts.follow_up_question import get_prompt as get_follow_up_question_prompt
import logging

# Load environment variables
load_dotenv()

# Initialize the Groq client
client = Groq()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def call_groq_model(
    system_message,
    user_prompt,
    model_name,
    temperature=0.7,
    max_tokens=500,
    top_p=0.9,
    stop=None,
    stream=False,
):
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_prompt},
    ]
    try:
        logger.info(f"Calling Groq model {model_name} with prompt: {user_prompt}")
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=model_name,
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            stop=stop,
            stream=stream,
        )
        response_text = chat_completion.choices[0].message.content.strip()
        logger.info(f"Received response: {response_text}")
        return response_text
    except Exception as e:
        logger.error(f"Error calling Groq model: {e}")
        return None

def generate_ideal_answer(question):
    system_message = (
        "You are an expert in this topic. Please provide a detailed and comprehensive answer to the following question."
    )
    ideal_answer = call_groq_model(
        system_message=system_message,
        user_prompt=question,
        model_name="llama-3.1-70b-versatile",
        temperature=0.7,
        max_tokens=500,
        top_p=0.9,
    )
    return ideal_answer

def check_answer(user_answer, ideal_answer):
    prompt = get_check_answer_prompt(user_answer, ideal_answer)
    system_message = (
        "You are an expert evaluator. Compare the user's answer with the ideal answer provided and provide a numerical score between 0 and 100."
    )
    score_text = call_groq_model(
        system_message=system_message,
        user_prompt=prompt,
        model_name="llama-3.1-70b-versatile",
        temperature=0.0,
        max_tokens=10,
        top_p=1.0,
    )
    try:
        score = int(score_text)
    except (ValueError, TypeError):
        score = 0
    return score

def get_follow_up_question(chat_history, topic):
    prompt = get_follow_up_question_prompt(topic, chat_history)
    system_message = (
        "You are a curious 12-year-old child interested in learning about the topic. Based on the conversation so far, ask a new question that is on the topic but not necessarily a direct follow-up. Ensure you do not repeat any previous questions."
    )
    follow_up_question = call_groq_model(
        system_message=system_message,
        user_prompt=prompt,
        model_name="gemma2-9b-it",
        temperature=0.9,
        max_tokens=100,
        top_p=0.95,
    )
    return follow_up_question

