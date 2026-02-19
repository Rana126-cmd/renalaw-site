@echo off
cd /d "%~dp0"
echo Sunucu baslatiliyor...
echo Tarayicinizda acin: http://localhost:8080
echo Durdurmak icin bu pencerede Ctrl+C yapin.
echo.
python -m http.server 8080
pause
