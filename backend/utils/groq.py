import os
from groq import Groq

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def transcribe_audio(audio_file_path: str) -> str:
    """
    Transcribes an audio file using Groq's Whisper model.

    Args:
        audio_file_path (str): The path to the audio file.

    Returns:
        str: The transcribed text from the audio file.

    Raises:
        ValueError: If transcription fails or the API returns an error.
    """
    # Check if the file exists
    if not os.path.exists(audio_file_path):
        raise FileNotFoundError(f"Audio file not found: {audio_file_path}")

    # Initialize the Groq client
    client = Groq(api_key=GROQ_API_KEY)

    try:
        # Open the audio file
        with open(audio_file_path, "rb") as file:
            # Transcribe the audio using Groq API
            transcription_response = client.audio.transcriptions.create(
                file=(audio_file_path, file.read()),
                model="whisper-large-v3-turbo",  # Transcription model
                response_format="json",          # Expected response format
                language="en",                   # Language for transcription
            )

        # Extract the transcription text
        transcription_text = transcription_response.text
        return transcription_text

    except Exception as e:
        raise ValueError(f"Failed to transcribe audio: {str(e)}")
