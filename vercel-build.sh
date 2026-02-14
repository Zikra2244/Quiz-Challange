#!/bin/bash
echo "=== CHECKING DIRECTORY STRUCTURE ==="
pwd
ls -la
echo "=== CHECKING SRC FOLDER ==="
ls -la src/
echo "=== CHECKING FEATURES FOLDER ==="
ls -la src/features/
echo "=== CHECKING LANDING FOLDER ==="
ls -la src/features/landing/
echo "=== CHECKING PAGES FOLDER ==="
ls -la src/features/landing/pages/
echo "=== CHECKING COMPONENTS FOLDER ==="
ls -la src/features/landing/components/
echo "=== CHECKING HOWITWORKS FOLDER ==="
ls -la src/features/landing/components/HowItWorks/
echo "=== BUILDING ==="
npm run build
