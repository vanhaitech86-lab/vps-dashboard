@echo off
chcp 65001 > nul
title DỊCH VỤ QUÉT DỮ LIỆU GOOGLE SHEETS LIÊN TỤC 24/7 - VPS GROUP
cd /d "%~dp0"
echo ==============================================================
echo   TẬP ĐOÀN CÔNG NGHỆ VPS - HỆ THỐNG QUÉT BÁO CÁO TỰ ĐỘNG
echo ==============================================================
echo Đang khởi động tiến trình quét dữ liệu liên tục...
python continuous_scanner.py
pause
