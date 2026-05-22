# PRD Ringkas FSM KERJA

## Gambaran Umum
FSM KERJA adalah aplikasi kerja berbasis aktivitas untuk monitoring, penugasan, pelaporan kegiatan, logbook, dan portofolio performa individu. Sistem tidak berpusat pada upload angka IKU, tetapi pada tugas, laporan, bukti, dan status pekerjaan.

## Role
- Dekan: monitoring seluruh fakultas dan memberi tugas strategis.
- Wakil Dekan: monitoring bidang dan memberi tugas ke unit/pelaksana.
- Kaprodi: monitoring prodi, menerima tugas dari pimpinan, memberi tugas ke dosen prodi.
- Supervisor: monitoring operasional dan memberi tugas ke staff.
- Dosen: menerima tugas dan membuat laporan kegiatan.
- Staff: menerima tugas, mengerjakan tugas, mengisi logbook, dan membuat laporan pekerjaan.
- Admin: mengelola role, user, indikator, output, kegiatan claimable, bukti minimal, dan verifikator.

## Flow Utama
1. Monitoring: pengguna melihat dashboard sesuai role.
2. Memberi tugas: atasan memilih kegiatan, penerima, deadline, prioritas, instruksi, dan bukti.
3. Menerima tugas: penerima membuka detail tugas, mengerjakan, lalu mengirim hasil.
4. Pelaporan kegiatan: pengguna memilih kegiatan dari katalog, mengisi detail, unggah bukti, dan mengirim ke verifikator.
5. Admin katalog: admin menambah indikator, output, dan kegiatan claimable agar sistem fleksibel saat aturan berubah.

## Struktur Fleksibel
Indikator → Output → Kegiatan Claimable → Bukti Minimal → Verifikator.

## MVP Frontend
- Dashboard
- Tugas Saya
- Detail Tugas
- Beri Tugas
- Laporan Kegiatan
- Form Laporan 5 langkah
- Katalog
- Admin Katalog
- Monitoring
- Portofolio
