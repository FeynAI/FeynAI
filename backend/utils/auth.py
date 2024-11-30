from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from utils.db import get_db_session
from models.user import User
import os

# OAuth2 setup for token-based authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Secret key and algorithm for JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db_session)
):
    """
    Validate the provided JWT token and retrieve the authenticated user from the database.
    """
    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if not user_id:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials"
            )
    except JWTError:
        # Token decoding error
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )

    # Query the user from the database
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
