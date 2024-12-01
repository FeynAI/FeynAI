def get_prompt(user_answer, ideal_answer):
    """
    Generate a refined prompt for evaluating the user's answer against the ideal answer.

    Args:
        user_answer (str): The user's answer to the question.
        ideal_answer (str): The ideal, expert-provided answer.

    Returns:
        str: The evaluation prompt.
    """
    prompt = f"""
You are an expert evaluator. Your task is to evaluate a user's answer compared to an ideal answer based on the following criteria:
1. **Correctness**: How factually accurate is the user's answer?
2. **Clarity**: Is the answer expressed clearly, and can it be understood by a curious 12-year-old?
3. **Completeness**: Does the answer include key concepts and details provided in the ideal answer?

Evaluate the user's answer by following these steps:
- **Step 1**: Compare the user's answer to the ideal answer.
- **Step 2**: Provide a score from 0 to 100, considering the following:
    - **90-100**: The answer is almost perfect—correct, clear, and complete.
    - **70-89**: The answer is mostly correct but could improve in clarity or completeness.
    - **50-69**: The answer is partially correct but missing key elements or is unclear.
    - **30-49**: The answer shows some understanding but is significantly incomplete or unclear.
    - **0-29**: The answer is incorrect, unclear, or unrelated.
- **Step 3**: Output a number between 0 and 100.

Ideal Answer:
{ideal_answer}

User's Answer:
{user_answer}

Begin your evaluation:
"""
    return prompt.strip()
# - **Step 3**: Explain the reasoning for your score, citing specific strengths and weaknesses in the user's answer.