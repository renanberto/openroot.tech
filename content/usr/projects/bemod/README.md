# Bemod

::status[AI infrastructure experiment]
::stack[Docker · FastAPI · LiteLLM · Ollama · Local LLMs]

## Problem

Not every AI task needs the same model.
Some tasks need speed, some need cost control, some need stronger reasoning and some can run locally.

## Solution

Bemod explores a routing layer between user intent and model execution.

:::grid
:::card[Local-first]
Use local models through Ollama when possible.
:::

:::card[Provider abstraction]
Use LiteLLM to normalize different model providers.
:::

:::card[Routing]
Choose model paths based on task type and context.
:::
:::

## Stack

::badge[Ollama]
::badge[LiteLLM]
::badge[FastAPI]
::badge[Docker]
::badge[OpenAI-ready]
::badge[Anthropic-ready]

## Why it matters

Bemod demonstrates AI engineering beyond prompts: routing, runtime, local/cloud tradeoffs and developer workflow design.
