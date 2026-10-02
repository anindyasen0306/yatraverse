"""
Aggregates all v1 route modules into a single router.

Adding a new feature area = create a route module and include it here.
"""

from fastapi import APIRouter

from app.api.v1.routes import health

api_router = APIRouter()

api_router.include_router(health.router)

# ---------------------------------------------------------------
# Registered in later phases:
#
#   from app.api.v1.routes import auth, destinations, trips, ai, weather, profile
#   api_router.include_router(auth.router,         prefix="/auth",         tags=["Auth"])
#   api_router.include_router(destinations.router, prefix="/destinations", tags=["Destinations"])
#   api_router.include_router(trips.router,        prefix="/trips",        tags=["Trips"])
#   api_router.include_router(ai.router,           prefix="/ai",           tags=["AI"])
#   api_router.include_router(weather.router,      prefix="/weather",      tags=["Weather"])
#   api_router.include_router(profile.router,      prefix="/profile",      tags=["Profile"])
# ---------------------------------------------------------------