.PHONY: help build up down test lint migrate scan-resources validate-tags remediate-tags

help:
	@echo "Tagging Governance Toolkit - Management Commands"
	@echo "-----------------------------------------------"
	@echo "build             : Build all service containers"
	@echo "up                : Start all services in the background"
	@echo "down              : Stop all services"
	@echo "test              : Run all tests (Unit + Integration)"
	@echo "lint              : Run linting checks"
	@echo "migrate           : Run database migrations"
	@echo "scan-resources    : Trigger resource inventory scan"
	@echo "validate-tags     : Validate inventory against tagging policies"
	@echo "remediate-tags    : Auto-apply suggested tags to non-compliant resources"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

scan-resources:
	docker-compose exec api python scripts/scan/run.py

validate-tags:
	docker-compose exec api python scripts/validate/run.py

remediate-tags:
	docker-compose exec api python scripts/remediate/run.py
