# Makefile for building and running Arrive SG in Docker.
# Run `make` (or `make help`) to list the available targets.

# Service names: each is a folder with a Dockerfile and a service in docker-compose.yml.
# Add a new service here and every Docker target picks it up.
SERVICES := frontend
COMPOSE  := docker compose -f docker-compose.yml

# Host ports, e.g. `make provision APP_PORT=9000`.
APP_PORT ?= 3000
DEV_PORT ?= 3001
export APP_PORT DEV_PORT

.DEFAULT_GOAL := help
.PHONY: help check build provision deprovision status logs test dev

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "} {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

## --- Setup ------------------------------------------------------------------

check: ## Verify prerequisites (Docker, the Compose plugin) are installed
	@command -v docker >/dev/null || { echo "missing: docker (see https://docs.docker.com/get-docker/)"; exit 1; }
	@docker compose version >/dev/null 2>&1 || { echo "missing: docker compose plugin (see https://docs.docker.com/compose/install/)"; exit 1; }
	@docker info >/dev/null 2>&1 || { echo "docker is installed but not running, or your user may not use it"; exit 1; }
	@echo "All prerequisites found."

## --- Everything in Docker (docker-compose.yml) ------------------------------

build: check ## Build the Docker image of every service (the frontend build runs its tests)
	$(COMPOSE) build $(SERVICES)

provision: check ## Build and start all services in Docker (detached); the app runs on http://localhost:3000 (APP_PORT=… to change)
	$(COMPOSE) up -d --build $(SERVICES)
	@echo "Arrive SG runs on http://localhost:$(APP_PORT)"

deprovision: ## Stop all services and remove their containers, volumes and orphans
	$(COMPOSE) --profile dev down -v --remove-orphans

status: ## List the running containers
	$(COMPOSE) ps

logs: ## Follow the logs of every service
	$(COMPOSE) logs -f $(SERVICES)

## --- Development ------------------------------------------------------------

test: check ## Run the frontend tests in Docker (every step must cite an official source)
	docker build --progress=plain --no-cache-filter test --target test frontend

dev: check ## Run the frontend with live reload on http://localhost:3001 (DEV_PORT=… to change; Ctrl+C stops it)
	$(COMPOSE) --profile dev up --build --renew-anon-volumes frontend-dev
