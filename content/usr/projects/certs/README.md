# AWS Certificate Validator

A multi-account certificate validation workflow for AWS environments.

## Problem

Certificates expire quietly until they do not.
In distributed environments, certificates can exist in files, keystores, instances, external endpoints and different AWS accounts.

## What it does

- validates internal certificates
- validates external TLS endpoints
- validates keystore-style certificate sources
- stores validation output
- notifies before expiration
- supports multi-account execution patterns

## Stack

- AWS Lambda
- SSM
- DynamoDB
- SNS
- IAM AssumeRole
- shell and certificate tooling

## What it demonstrates

This project demonstrates operational automation, certificate hygiene, AWS orchestration and alerting around a real production risk.
