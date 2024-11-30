def format_history(chat_messages):
    """
    Format the chat history into a single string for prompts.
    Args:
        chat_messages (list): List of chat message objects.
    Returns:
        str: Formatted chat history as a string.
    """
    return "\n".join([f"{msg.role}: {msg.message}" for msg in chat_messages])
