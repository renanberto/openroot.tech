# Bemod

Bemod is a multi-model AI routing experiment.

## Problem

Different tasks need different models.
Some jobs are better handled locally, some need stronger cloud models, and some need routing based on cost, speed or context.

## What it explores

- local models with Ollama
- LiteLLM as a provider abstraction layer
- OpenAI-ready and Anthropic-ready model paths
- routing by task type
- Dockerized local AI infrastructure
- foundations for agents and tool runtime

## Stack

- Docker
- FastAPI
- LiteLLM
- Ollama
- local LLMs
- cloud model integration-ready

## What it demonstrates

Bemod shows interest in AI infrastructure beyond prompt usage: model routing, runtime design, local/cloud tradeoffs and practical developer workflows.
