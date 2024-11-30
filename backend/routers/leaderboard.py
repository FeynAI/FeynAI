from fastapi import APIRouter, Query
from controllers import leaderboard_controller

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

@router.get("/")
def get_leaderboard(by_session: bool = Query(default=False)):
    return leaderboard_controller.get_leaderboard(by_session=by_session)

