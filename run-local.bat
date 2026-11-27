@echo off
echo ===================================================================
echo   Mobile Banking Application - Team 7 (SE Assignment 2)
echo ===================================================================
echo.
echo Starting local web server on port 8000...
echo.

start "" "http://localhost:8000"
python -m http.server 8000

if %ERRORLEVEL% NEQ 0 (
    echo Python server could not start. Opening index.html directly in browser...
    start "" "index.html"
)
pause
