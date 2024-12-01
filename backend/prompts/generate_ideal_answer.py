def get_prompt(question: str) -> str:
    """
    Generate the prompt for creating an ideal answer to a given question.

    Args:
        question (str): The question for which an ideal answer is to be generated.

    Returns:
        str: The formatted prompt.
    """
    prompt = f"""
    You are an expert teacher and researcher with a deep understanding of various scientific and technical topics.
    Your task is to provide a detailed, accurate, and clear answer to the following question.

    Question:
    {question}

    Guidelines for your response:
    1. Your answer must be factual, complete, and supported by evidence where applicable.
    2. Break down complex concepts into simple, digestible explanations.
    3. Use examples, analogies, and real-world applications to enhance understanding, if relevant.
    4. Ensure the tone of your response is professional but engaging.
    5. Avoid using jargon unless necessary, and always define any technical terms used.

    Format your response as a well-structured explanation that would help a curious student or learner fully understand the topic.
    
    Your answer shouldn't be too technical or too simplistic, but rather strike a balance that is both informative and engaging and shouldn't exceed 100 words.

    Begin your answer now.
    """
    return prompt.strip()