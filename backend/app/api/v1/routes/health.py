"""Health and readiness endpoints."""

from fastapi import APIRouter, status
from pydantic import BaseModel

from app import __version__
from app.core.config import settings

router = APIRouter(tags=["Health"])


class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    environment: str


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Liveness probe",
)
async def health() -> HealthResponse:
    """Return basic service health. Used by uptime checks and the frontend."""
    return HealthResponse(
        status="ok",
        app=settings.APP_NAME,
        version=__version__,
        environment=settings.APP_ENV,
    )


@router.get(
    "/health/ready",
    status_code=status.HTTP_200_OK,
    summary="Readiness probe",
)
async def readiness() -> dict[str, str]:
    """
    Readiness probe.

    Phase 4 will extend this to ping the database. For now it confirms the
    process is accepting traffic.
    """
    return {"status": "ready"}