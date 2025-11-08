@echo off
REM Script untuk mengakses psql dengan full path
REM Ganti versi PostgreSQL sesuai yang terinstall (16, 15, 14, dll)

REM Coba versi 16 dulu
if exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" (
    "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
    goto :end
)

REM Coba versi 15
if exist "C:\Program Files\PostgreSQL\15\bin\psql.exe" (
    "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres
    goto :end
)

REM Coba versi 14
if exist "C:\Program Files\PostgreSQL\14\bin\psql.exe" (
    "C:\Program Files\PostgreSQL\14\bin\psql.exe" -U postgres
    goto :end
)

echo PostgreSQL tidak ditemukan di lokasi default.
echo Silakan cek lokasi instalasi PostgreSQL Anda.
pause

:end

