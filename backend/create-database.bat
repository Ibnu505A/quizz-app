@echo off
REM Script untuk membuat database quiz_app

echo ========================================
echo Membuat Database quiz_app
echo ========================================
echo.

REM Cek versi PostgreSQL yang terinstall
if exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" (
    set PSQL_PATH="C:\Program Files\PostgreSQL\16\bin\psql.exe"
    goto :create
)

if exist "C:\Program Files\PostgreSQL\15\bin\psql.exe" (
    set PSQL_PATH="C:\Program Files\PostgreSQL\15\bin\psql.exe"
    goto :create
)

if exist "C:\Program Files\PostgreSQL\14\bin\psql.exe" (
    set PSQL_PATH="C:\Program Files\PostgreSQL\14\bin\psql.exe"
    goto :create
)

echo PostgreSQL tidak ditemukan!
echo Silakan jalankan secara manual menggunakan pgAdmin atau full path.
pause
exit

:create
echo Menjalankan: %PSQL_PATH% -U postgres
echo.
echo Anda akan diminta memasukkan password PostgreSQL.
echo.
echo Setelah masuk, jalankan perintah berikut:
echo   CREATE DATABASE quiz_app;
echo   \l
echo   \q
echo.
pause

%PSQL_PATH% -U postgres

