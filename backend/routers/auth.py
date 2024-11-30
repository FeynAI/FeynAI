from fastapi import APIRouter, Depends, HTTPException, Header
from controllers import auth_controller
from schemas.auth import UserCreate, UserLogin
from utils.db import get_db_session

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
def signup(user: UserCreate):
    return auth_controller.signup(user)

@router.post("/login")
def login(user: UserLogin):
    return auth_controller.login(user)

@router.get("/me")
def get_user_info(
    authorization: str = Header(...),  # Expecting "Bearer <token>" in the Authorization header
    db=Depends(get_db_session),  # Database session
):
    """
    Retrieve the current user's information using the provided token.
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    token = authorization.split(" ")[1]  # Extract the token
    return auth_controller.get_current_user_info(token, db)
