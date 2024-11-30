from fastapi import APIRouter
from controllers import auth_controller
from schemas.auth import UserCreate, UserLogin

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
def signup(user: UserCreate):
    return auth_controller.signup(user)

@router.post("/login")
def login(user: UserLogin):
    return auth_controller.login(user)
