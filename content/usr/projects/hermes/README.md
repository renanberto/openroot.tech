# Hermes / Remote Management

::status[architecture]
::stack[DynamoDB · Cognito · REST APIs · Command Templates]

## Problem

Remote device operations need controlled commands, authorization, response handling and auditability.

## Solution

Hermes models command execution and get-data flows using templates, authorities and integration contracts.

:::grid
:::card[Commands]
Reboot, reset, scan, speed test and diagnostics.
:::

:::card[Authorization]
Authority-based access with identity context.
:::

:::card[Integration]
Structured request and response handling.
:::
:::

## Stack

::badge[DynamoDB]
::badge[Cognito]
::badge[REST]
::badge[Command Templates]
::badge[Operations]

## Why it matters

Hermes demonstrates architecture for remote operations where control, safety and repeatability matter.
