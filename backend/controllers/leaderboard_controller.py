from utils.db import get_db_session
from models.user import User

def get_leaderboard(by_session=False):
    db = get_db_session()
    
    if by_session:
        # Session-based leaderboard
        sessions = db.query(Session).order_by(Session.score.desc()).limit(10).all()
        leaderboard = [
            {
                "email": session.user.email,
                "topic": session.topic,
                "score": session.score,
                "session_id": session.id,
            }
            for session in sessions
        ]
    else:
        # User-based leaderboard
        users = db.query(User).order_by(User.score.desc()).limit(10).all()
        leaderboard = [{"email": user.email, "score": user.score} for user in users]

    db.close()
    return {"leaderboard": leaderboard}

