# AWS Certificate Validator

::status[operations automation]
::stack[AWS Lambda · SSM · DynamoDB · SNS · IAM]

## Problem

Certificates can expire quietly across instances, files, keystores, endpoints and accounts.
When they finally fail, the blast radius is rarely polite.

## Solution

A multi-account AWS workflow validates certificate sources, stores results and alerts before expiration.

:::grid
:::card[Internal]
Validate certificates stored on instances or paths.
:::

:::card[External]
Validate public or private TLS endpoints.
:::

:::card[Keystores]
Support keystore-oriented certificate checks.
:::
:::

## Stack

::badge[Lambda]
::badge[SSM]
::badge[DynamoDB]
::badge[SNS]
::badge[AssumeRole]
::badge[Shell]

## Why it matters

This is production hygiene: reduce hidden certificate risk, create visibility and automate an operational pain point.
