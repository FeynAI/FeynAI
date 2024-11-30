from fastapi import HTTPException
from sqlalchemy.orm import Session
from schemas.auth import UserCreate, UserLogin
from models.user import User
from utils.db import get_db_session
from utils import auth
import bcrypt
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

def signup(user: UserCreate):
    db = get_db_session()
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")
    new_user = User(email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.close()
    return {"message": "User created successfully"}

def login(user: UserLogin):
    db = get_db_session()
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user or not bcrypt.checkpw(
        user.password.encode("utf-8"), existing_user.password.encode("utf-8")
    ):
        db.close()
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = jwt.encode({"user_id": existing_user.id}, SECRET_KEY, algorithm="HS256")
    db.close()
    return {"access_token": token}
