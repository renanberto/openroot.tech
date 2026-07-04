# AWS WAF Security Cases

::status[security case study]
::stack[AWS WAF · CloudFront · Bot Control · CAPTCHA · CloudWatch]

## Problem

Credential stuffing attacks create noisy, repetitive traffic and can threaten user accounts.
The challenge is blocking abuse without punishing legitimate users.

## Solution

Use edge protection patterns with AWS WAF and CloudFront to identify suspicious traffic and apply targeted controls.

:::grid
:::card[Detection]
Analyze user-agent, behavior and request patterns.
:::

:::card[Mitigation]
Use WAF rules, Bot Control and CAPTCHA where appropriate.
:::

:::card[Visibility]
Use logs and metrics to understand impact.
:::
:::

## Stack

::badge[AWS WAF]
::badge[CloudFront]
::badge[Bot Control]
::badge[CAPTCHA]
::badge[CloudWatch]

## Why it matters

This project shows practical security engineering: controls, tradeoffs, observability and operational rollout.
