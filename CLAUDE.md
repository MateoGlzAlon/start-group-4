# Project context

We are building a tool that gives international students at HSG (University of St. Gallen) step-by-step relocation guides tailored to their profile.

## Problem definition

**Who:** International students, both before and after they move to St. Gallen.

**Problem:**
- Information is spread across many government websites.
- It is in a language they do not understand.
- It is not adapted to their profile.

**Current situation:** Students cope with confusion, inefficiency and unnecessary work, which costs them time and nerves.

## Value proposition

| | |
|---|---|
| **Customer** | HSG |
| **Problem we solve** | Unnecessary bureaucracy |
| **Solution** | Detailed step-by-step guides adapted to each student's profile |
| **Alternatives** | Government websites; emails and queries to the admissions office |
| **Why we're better** | HSG employees can spend their time on more important tasks |

**In one sentence:** For HSG, we cut unnecessary bureaucracy with detailed step-by-step guides adapted to each student's profile. This beats government websites and admissions office emails because it frees HSG employees to spend their time on more important tasks.

## Everything runs in Docker

- Every part of the system (frontend, backend, database and any other service) runs in a Docker container. The only things needed on the host are Docker with the Compose plugin, and `make`.
- Each service has its own `Dockerfile`. A Docker Compose file at the repository root ties all services together.
- When you add a service, add its `Dockerfile`, its Compose entry and its Makefile entry in the same change.

## A Makefile sets up and tears down the system

The root `Makefile` is the single entry point for running the system. It follows the layout of the Makefile in our `pitas-hs26-group2` project:

- Running `make` with no target prints the help (`.DEFAULT_GOAL := help`). Every target has a `## description` comment on its line, and `help` lists the targets by grepping for that comment.
- Variables at the top: `SERVICES` lists the services, so adding a service there is enough for every target to pick it up. `COMPOSE` holds the `docker compose -f …` command.
- Targets are grouped under `## --- Section ---` comment headers, and all of them are declared in `.PHONY`.

It has at least these targets:

| Target | What it does |
|---|---|
| `help` | List all targets with their descriptions |
| `check` | Verify the prerequisites (Docker, the Compose plugin) are installed, with a clear message for each missing one |
| `build` | Build the Docker image of every service |
| `provision` | Start the whole system in Docker, detached (`docker compose up -d`) |
| `deprovision` | Stop the system and remove its containers, volumes and orphans (`docker compose down -v --remove-orphans`) |

As the system grows, add more targets (tests, logs, …) under their own section. When a target is added or changed, update its `##` description in the same change.
