#!/bin/sh
# requires mc (MinIO client). Use this to create bucket & set public policy for demo.
mc alias set local http://localhost:9000 minioadmin minioadmin
mc mb local/warrantyvault || true
mc policy set public local/warrantyvault || true
echo 'MinIO bucket warrantyvault ready'
