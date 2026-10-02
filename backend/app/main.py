"""
YatraVerse API entry point.

Run locally:
    uvicorn app.main:app --reload --port 8000
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app import __version__
from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging, get_logger
from app.database.session import dispose_engine

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown hooks."""
    configure_logging()
    logger.info("Starting %s v%s [%s]", settings.APP_NAME, __version__, settings.APP_ENV)

    if settings.is_production and settings.JWT_SECRET_KEY.startswith("insecure"):
        logger.warning("JWT_SECRET_KEY is insecure — set a real secret before deploying.")

    yield

    logger.info("Shutting down %s", settings.APP_NAME)
    await dispose_engine()


def create_app() -> FastAPI:
    """Application factory."""
    app = FastAPI(
        title=settings.APP_NAME,
        description="Travel discovery and AI trip-planning API.",
        version=__version__,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # ---------- CORS ----------
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ---------- Routers ----------
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    # ---------- Exception handlers ----------
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(_: Request, exc: StarletteHTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {"code": exc.status_code, "message": exc.detail},
            },
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(_: Request, exc: RequestValidationError):
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "error": {
                    "code": 422,
                    "message": "Validation failed",
                    "details": exc.errors(),
                },
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(_: Request, exc: Exception):
        # Never leak internals to the client.
        logger.exception("Unhandled error: %s", exc)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "error": {
                    "code": 500,
                    "message": "An unexpected error occurred. Please try again.",
                },
            },
        )

    @app.get("/", tags=["Root"], summary="API root")
    async def root() -> dict[str, str]:
        return {
            "app": settings.APP_NAME,
            "version": __version__,
            "docs": "/docs",
            "api": settings.API_V1_PREFIX,
        }

    return app


app = create_app()