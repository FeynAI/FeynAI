def get_prompt(user_answer, ideal_answer):
    prompt = f"""
You are an expert evaluator. Compare the user's answer with the ideal answer provided. Evaluate the user's answer based on correctness, clarity, and completeness. Provide a score between 0 and 100.

Ideal Answer:
{ideal_answer}

User's Answer:
{user_answer}
"""
    return prompt.strip()