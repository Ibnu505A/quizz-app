# Cara Menambahkan PostgreSQL ke PATH (Opsional)

Jika ingin menggunakan `psql` langsung tanpa full path, tambahkan PostgreSQL ke PATH.

## Cara 1: Via System Properties (GUI)

1. **Buka System Properties**
   - Tekan `Win + R`
   - Ketik: `sysdm.cpl`
   - Tekan Enter

2. **Buka Environment Variables**
   - Klik tab "Advanced"
   - Klik "Environment Variables..."

3. **Edit PATH**
   - Di bagian "System variables", cari "Path"
   - Klik "Edit..."
   - Klik "New"
   - Tambahkan: `C:\Program Files\PostgreSQL\16\bin`
     (Ganti `16` dengan versi PostgreSQL Anda)
   - Klik "OK" di semua jendela

4. **Restart Command Prompt/PowerShell**
   - Tutup semua Command Prompt/PowerShell yang terbuka
   - Buka baru
   - Test: `psql --version`

## Cara 2: Via Command Line (PowerShell as Administrator)

```powershell
# Buka PowerShell sebagai Administrator
# Jalankan:

[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\Program Files\PostgreSQL\16\bin",
    "Machine"
)
```

**Catatan:** Ganti `16` dengan versi PostgreSQL Anda.

## Verifikasi

Setelah menambahkan ke PATH, restart Command Prompt dan test:

```bash
psql --version
```

Jika muncul versi, berarti sudah berhasil!

