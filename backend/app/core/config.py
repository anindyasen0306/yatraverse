"""
Centralised, type-safe application configuration.

All configuration flows through this module so that no other part of the
codebase reads `os.environ` directly. This makes the app testable and keeps
secrets out of business logic.
"""

from functools import lru_cache
from typing import Literal

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ---------- App ----------
    APP_NAME: str = "YatraVerse"
    APP_ENV: Literal["development", "staging", "production", "test"] = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    # ---------- Database ----------
    DATABASE_URL: str = (
        "postgresql+asyncpg://yatraverse:yatraverse@localhost:5432/yatraverse"
    )
    SYNC_DATABASE_URL: str = (
        "postgresql+psycopg2://yatraverse:yatraverse@localhost:5432/yatraverse"
    )
    DB_ECHO: bool = False
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20

    # ---------- Auth ----------
    JWT_SECRET_KEY: str = "insecure-dev-key-change-me"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # ---------- CORS ----------
    CORS_ORIGINS: list[str] = Field(
        default_factory=lambda: ["http://localhost:5173", "http://127.0.0.1:5173"]
    )

    # ---------- AI ----------
    AI_PROVIDER: Literal["mock", "openai", "gemini"] = "mock"
    AI_API_KEY: str | None = None
    AI_MODEL: str = "gpt-4o-mini"
    AI_TIMEOUT_SECONDS: int = 45

    # ---------- Weather ----------
    WEATHER_PROVIDER: Literal["mock", "openweather"] = "mock"
    WEATHER_API_KEY: str | None = None
    WEATHER_TIMEOUT_SECONDS: int = 15

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def _split_origins(cls, value: object) -> object:
        """Allow CORS_ORIGINS to be supplied as a comma-separated string."""
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @property
    def is_production(self) -> bool:
        return self.APP_ENV == "production"

    @property
    def is_development(self) -> bool:
        return self.APP_ENV == "development"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached Settings instance (one per process)."""
    return Settings()


settings = get_settings()