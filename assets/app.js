const roles = ["Dekan", "Wakil Dekan", "Kaprodi", "Supervisor", "Dosen", "Staff", "Admin"];

const roleProfiles = {
  "Dekan": { name: "Prof. Dr. Budiyono, M.Si", title: "Dekan", unit: "Fakultas", initial: "DK" },
  "Wakil Dekan": { name: "Dr. Eng. Adi Wibowo", title: "Wakil Dekan", unit: "Bidang Sumber Daya", initial: "WD" },
  "Kaprodi": { name: "Dr. Rina Kusumawati", title: "Kaprodi", unit: "S1 Informatika", initial: "KP" },
  "Supervisor": { name: "Pak Nurhadi", title: "Supervisor", unit: "Akademik dan Kemahasiswaan", initial: "SV" },
  "Dosen": { name: "Dr. Budi Santoso", title: "Dosen", unit: "S1 Informatika", initial: "DS" },
  "Staff": { name: "Mba Alik", title: "Staff", unit: "Administrasi Umum", initial: "ST" },
  "Admin": { name: "Admin FSM KERJA", title: "Admin Sistem", unit: "IT FSM", initial: "AD" },
};

const rolePermissions = {
  "Dekan": { monitoring: true, assign: true, receive: true, report: false, verify: true, admin: false, scope: "Seluruh fakultas" },
  "Wakil Dekan": { monitoring: true, assign: true, receive: true, report: false, verify: true, admin: false, scope: "Bidang/unit terkait" },
  "Kaprodi": { monitoring: true, assign: true, receive: true, report: true, verify: true, admin: false, scope: "Program studi" },
  "Supervisor": { monitoring: true, assign: true, receive: true, report: true, verify: true, admin: false, scope: "Staff/unit layanan" },
  "Dosen": { monitoring: false, assign: false, receive: true, report: true, verify: false, admin: false, scope: "Pribadi" },
  "Staff": { monitoring: false, assign: false, receive: true, report: true, verify: false, admin: false, scope: "Pribadi/logbook" },
  "Admin": { monitoring: true, assign: true, receive: true, report: true, verify: true, admin: true, scope: "Data sistem" },
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦", show: () => true },
  { id: "tasks", label: "Tugas Saya", icon: "▣", show: () => true },
  { id: "assign", label: "Beri Tugas", icon: "➜", show: (r) => rolePermissions[r].assign },
  { id: "reports", label: "Laporan Kegiatan", icon: "▤", show: () => true },
  { id: "logbook", label: "Logbook", icon: "✎", show: (r) => ["Staff", "Supervisor", "Admin"].includes(r) },
  { id: "portfolio", label: "Portofolio", icon: "◎", show: () => true },
  { id: "catalog", label: "Katalog", icon: "▰", show: () => true },
  { id: "verification", label: "Verifikasi", icon: "⚙", show: (r) => rolePermissions[r].verify },
  { id: "monitoring", label: "Monitoring Unit", icon: "▥", show: (r) => rolePermissions[r].monitoring },
  { id: "admin", label: "Admin", icon: "◈", show: (r) => rolePermissions[r].admin },
];

const defaultCatalog = [
  {
    id: "ind-wcu",
    name: "WCU dan Internasionalisasi",
    type: "WCU",
    year: 2026,
    status: "Aktif",
    outputs: [
      {
        id: "out-summer",
        name: "Summer Course",
        desc: "Kegiatan internasional yang melibatkan mahasiswa atau dosen asing.",
        activities: [
          { id: "act-pic-summer", name: "Menjadi PIC Summer Course", mode: "Penugasan", evidence: "Proposal, presensi, dokumentasi, laporan", verifier: "Wakil Dekan/Admin" },
          { id: "act-report-wcu", name: "Menyusun laporan kegiatan WCU", mode: "Penugasan", evidence: "Laporan final, dokumentasi, URL publikasi", verifier: "Wakil Dekan" },
        ],
      },
      {
        id: "out-pub-int",
        name: "Publikasi Internasional",
        desc: "Publikasi yang mendukung paper per faculty dan reputasi akademik.",
        activities: [
          { id: "act-journal", name: "Publikasi Jurnal Internasional", mode: "Mandiri", evidence: "DOI, PDF artikel, metadata jurnal", verifier: "Kaprodi/Admin" },
        ],
      },
    ],
  },
  {
    id: "ind-akademik",
    name: "Akademik dan Pembelajaran",
    type: "IKU",
    year: 2026,
    status: "Aktif",
    outputs: [
      {
        id: "out-rps",
        name: "Pembelajaran Case Method / Team-Based Project",
        desc: "Output pembelajaran aktif pada mata kuliah.",
        activities: [
          { id: "act-rps", name: "Pembuatan RPS Case Method", mode: "Mandiri", evidence: "RPS, rubrik, bukti LMS", verifier: "Kaprodi" },
          { id: "act-book", name: "Penyusunan Buku Ajar", mode: "Mandiri", evidence: "ISBN/draft buku, SK/ST, bukti terbit", verifier: "Kaprodi" },
        ],
      },
    ],
  },
  {
    id: "ind-tata-kelola",
    name: "Tata Kelola dan Layanan",
    type: "Custom Fakultas",
    year: 2026,
    status: "Aktif",
    outputs: [
      {
        id: "out-dokumen",
        name: "Dokumen Administrasi dan Kerja Sama",
        desc: "Penyelesaian dokumen administrasi fakultas dan kerja sama.",
        activities: [
          { id: "act-sk", name: "Pembuatan SK Rektor/Dekan", mode: "Penugasan", evidence: "Draft SK, lampiran, tanda terima", verifier: "Supervisor" },
          { id: "act-mou", name: "Dokumen Kerja Sama dengan Mitra", mode: "Penugasan", evidence: "MoU/MoA, BA, dokumen mitra", verifier: "Wakil Dekan" },
        ],
      },
    ],
  },
];

const defaultTasks = [
  { id: "tsk-001", title: "Pembuatan SK Rektor", category: "Administrasi", activityId: "act-sk", from: "Wakil Dekan", to: "Staff", unit: "Administrasi Umum", deadline: "2026-01-25", priority: "Tinggi", status: "Sedang Dikerjakan", progress: 40, desc: "Mohon segera disusun draft SK Rektor untuk pengangkatan panitia WCU. Pastikan format mengikuti template terbaru dan lampiran peserta diperiksa kembali." },
  { id: "tsk-002", title: "Pengisian IKU 12", category: "Akademik", activityId: "act-report-wcu", from: "Dekan", to: "Kaprodi", unit: "S1 Informatika", deadline: "2026-01-20", priority: "Normal", status: "Baru", progress: 0, desc: "Lengkapi data indikator program studi dan unggah bukti yang relevan pada laporan kegiatan." },
  { id: "tsk-003", title: "Koreksi Laporan PKL", category: "Akademik", activityId: "act-rps", from: "Kaprodi", to: "Dosen", unit: "S1 Informatika", deadline: "2026-01-18", priority: "Normal", status: "Baru", progress: 0, desc: "Mohon review laporan PKL mahasiswa dan berikan catatan perbaikan." },
  { id: "tsk-004", title: "Input Luaran Pengabdian", category: "PkM", activityId: "act-journal", from: "Wakil Dekan", to: "Dosen", unit: "S1 Biologi", deadline: "2026-01-22", priority: "Normal", status: "Menunggu Review", progress: 90, desc: "Unggah luaran pengabdian dan bukti kegiatan pengabdian masyarakat." },
  { id: "tsk-005", title: "Validasi KRS Mahasiswa Wali", category: "Akademik", activityId: "act-rps", from: "Kaprodi", to: "Dosen", unit: "S1 Informatika", deadline: "2026-10-14", priority: "Tinggi", status: "Baru", progress: 0, desc: "Validasi KRS 12 mahasiswa wali sebelum batas akhir akademik." },
];

const defaultReports = [
  { id: "rep-001", title: "Seminar Internasional ICAS 2023", activityId: "act-pic-summer", reporter: "Dosen", unit: "S1 Fisika", date: "2026-01-08", status: "Terverifikasi", tag: "WCU", desc: "Pemakalah pada seminar internasional." },
  { id: "rep-002", title: "Modul Praktikum Jarkom", activityId: "act-rps", reporter: "Dosen", unit: "S1 Informatika", date: "2026-01-05", status: "Sedang Direview", tag: "IKU", desc: "Penyusunan modul praktikum jaringan komputer." },
  { id: "rep-003", title: "Bimbingan KKN Tematik", activityId: "act-book", reporter: "Dosen", unit: "S1 Biologi", date: "2026-01-02", status: "Perlu Revisi", tag: "IKU", desc: "Bimbingan mahasiswa pada KKN tematik." },
];

const state = {
  role: localStorage.getItem("fsm_role") || "Dosen",
  page: localStorage.getItem("fsm_page") || "dashboard",
  selectedActivity: null,
  formStep: 1,
  catalog: load("fsm_catalog", defaultCatalog),
  tasks: load("fsm_tasks", defaultTasks),
  reports: load("fsm_reports", defaultReports),
};

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function $(sel) { return document.querySelector(sel); }
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function toast(message) {
  const t = $("#toast");
  t.textContent = message;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2300);
}
function statusBadge(status) {
  const map = {
    "Baru": "process", "Diterima": "process", "Sedang Dikerjakan": "warning", "Menunggu Review": "process",
    "Perlu Revisi": "warning", "Selesai": "success", "Terlambat": "danger", "Dibatalkan": "gray",
    "Draft": "gray", "Dikirim": "process", "Sedang Direview": "process", "Terverifikasi": "success", "Ditolak": "danger", "Konflik": "danger",
    "Aktif": "success", "Nonaktif": "gray", "Tinggi": "danger", "Normal": "gray"
  };
  return `<span class="badge ${map[status] || "gray"}">${status}</span>`;
}
function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
function allActivities() {
  return state.catalog.flatMap(ind => ind.outputs.flatMap(out => out.activities.map(act => ({ ...act, indicator: ind, output: out }))));
}
function activityById(id) { return allActivities().find(a => a.id === id); }
function tasksForRole(role = state.role) {
  const p = roleProfiles[role];
  if (["Dekan", "Wakil Dekan", "Admin"].includes(role)) return state.tasks;
  if (role === "Kaprodi") return state.tasks.filter(t => t.to === "Kaprodi" || t.from === "Kaprodi" || t.unit.includes("Informatika"));
  if (role === "Supervisor") return state.tasks.filter(t => t.to === "Supervisor" || t.from === "Supervisor" || t.to === "Staff");
  return state.tasks.filter(t => t.to === role || t.unit === p.unit);
}
function reportsForRole(role = state.role) {
  if (["Dekan", "Wakil Dekan", "Admin"].includes(role)) return state.reports;
  if (role === "Kaprodi") return state.reports.filter(r => r.unit === "S1 Informatika" || r.reporter === "Dosen");
  return state.reports.filter(r => r.reporter === role || (role === "Dosen" && r.reporter === "Dosen"));
}

function init() {
  const switcher = $("#roleSwitcher");
  roles.forEach(r => switcher.appendChild(el(`<option value="${r}">${r}</option>`)));
  switcher.value = state.role;
  switcher.addEventListener("change", (e) => setRole(e.target.value));
  $("#mobileToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  document.body.addEventListener("click", e => {
    const btn = e.target.closest("[data-page]");
    if (btn) setPage(btn.dataset.page);
    const taskBtn = e.target.closest("[data-task-detail]");
    if (taskBtn) renderTaskDetail(taskBtn.dataset.taskDetail);
    const actCard = e.target.closest("[data-activity]");
    if (actCard) {
      state.selectedActivity = actCard.dataset.activity;
      renderReportForm(2);
    }
  });
  updateShell();
  render();
}

function setRole(role) {
  state.role = role;
  localStorage.setItem("fsm_role", role);
  updateShell();
  render();
  toast(`Role aktif: ${role}`);
}
function setPage(page) {
  state.page = page;
  localStorage.setItem("fsm_page", page);
  state.formStep = page === "report-form" ? 1 : state.formStep;
  $("#sidebar").classList.remove("open");
  render();
}
function updateShell() {
  const p = roleProfiles[state.role];
  $("#userName").textContent = p.name;
  $("#userRoleLabel").textContent = `${p.title} • ${p.unit}`;
  $("#avatarInitial").textContent = p.initial;
  $("#roleSwitcher").value = state.role;
  renderNav();
}
function renderNav() {
  const nav = $("#sidebarNav");
  nav.innerHTML = "";
  navItems.filter(item => item.show(state.role)).forEach(item => {
    nav.appendChild(el(`<button class="nav-btn ${state.page === item.id ? "active" : ""}" data-page="${item.id}"><span class="icon">${item.icon}</span>${item.label}</button>`));
  });
}
function render() {
  renderNav();
  const map = {
    dashboard: renderDashboard,
    tasks: renderTasks,
    assign: renderAssign,
    reports: renderReports,
    "report-form": () => renderReportForm(state.formStep),
    logbook: renderLogbook,
    portfolio: renderPortfolio,
    catalog: renderCatalog,
    verification: renderVerification,
    monitoring: renderMonitoring,
    admin: renderAdmin,
  };
  (map[state.page] || renderDashboard)();
}
function pageHeader(title, subtitle, actions = "") {
  return `<div class="page-title"><div><h2>${title}</h2><p>${subtitle}</p></div><div class="page-actions">${actions}</div></div>`;
}
function kpi(title, value, note, icon, tone = "") {
  return `<div class="kpi-card ${tone}"><div><label>${title}</label><div class="kpi-value">${value}</div><div class="kpi-note">${note}</div></div><div class="kpi-icon">${icon}</div></div>`;
}

function renderDashboard() {
  const tasks = tasksForRole();
  const reports = reportsForRole();
  const active = tasks.filter(t => !["Selesai", "Dibatalkan"].includes(t.status)).length;
  const overdue = tasks.filter(t => t.priority === "Tinggi" || t.status === "Terlambat").length;
  const revision = reports.filter(r => r.status === "Perlu Revisi").length;
  const verified = reports.filter(r => r.status === "Terverifikasi").length;
  const canAssign = rolePermissions[state.role].assign;
  const title = state.role === "Dekan" ? "Dashboard Pimpinan" : `Dashboard ${state.role}`;
  const subtitle = state.role === "Dosen" || state.role === "Staff" ? "Selamat datang kembali. Berikut ringkasan kinerja dan tugas aktif Anda." : "Pantau pekerjaan, laporan, penugasan, dan performa sesuai kewenangan role Anda.";
  $("#pageContent").innerHTML = `
    ${pageHeader(title, subtitle, `<button class="btn secondary">Ekspor Rekap</button>${canAssign ? `<button class="btn primary" data-page="assign">+ Beri Tugas</button>` : `<button class="btn primary" data-page="report-form">+ Buat Laporan</button>`}`)}
    <div class="kpi-grid">
      ${kpi("Tugas Aktif", active, "+2 minggu ini", "▣")}
      ${kpi("Overdue / Prioritas", overdue, "Segera tindak lanjut", "!", "danger")}
      ${kpi("Butuh Revisi", revision, "Laporan perlu diperbaiki", "↻", "warning")}
      ${kpi("Terverifikasi", verified, "Masuk portofolio", "✓", "success")}
    </div>
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header tint"><h3>Aktivitas Saya</h3><button class="btn ghost" data-page="reports">Lihat Semua</button></div>
        <div class="panel-body">
          <div class="timeline-list">
            <div class="timeline-item"><div class="timeline-dot success">✓</div><div><h4>Laporan Berhasil Diverifikasi</h4><p>Seminar Internasional ICAS 2023</p><time>TADI, 10:45 WIB</time></div></div>
            <div class="timeline-item"><div class="timeline-dot">↗</div><div><h4>Tugas Baru: ${tasks[0]?.title || "Tidak ada tugas"}</h4><p>${tasks[0]?.desc?.slice(0, 82) || "Belum ada aktivitas."}</p><time>08:30 WIB</time></div></div>
            <div class="timeline-item"><div class="timeline-dot warning">!</div><div><h4>Revisi Dibutuhkan</h4><p>Silakan perbaiki bagian metodologi/bukti minimal.</p><time>KEMARIN, 16:20 WIB</time></div></div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Timeline Tugas</h3></div>
        <div class="panel-body timeline-card">
          ${tasks.slice(0,4).map((t, i) => `<div class="deadline-item"><span class="deadline-dot ${i===0 ? "danger" : i===1 ? "warning" : i===3 ? "gray" : ""}"></span><div><strong>${t.title}</strong><span>${formatDate(t.deadline)} • ${t.status}</span></div></div>`).join("")}
        </div>
      </div>
    </div>
    <div class="grid-2-even">
      <div class="panel">
        <div class="panel-header"><h3>Tugas Saya</h3><button class="btn ghost" data-page="tasks">Lihat Semua</button></div>
        ${taskTable(tasks.slice(0,3))}
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Riwayat Laporan Kegiatan</h3><button class="btn ghost" data-page="reports">Lihat Semua</button></div>
        ${reportTable(reports.slice(0,3))}
      </div>
    </div>
  `;
}

function taskTable(tasks) {
  return `<div class="table-wrap"><table><thead><tr><th>Nama Kegiatan</th><th>Kategori</th><th>Deadline</th><th>Prioritas</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${tasks.map(t => `<tr><td><strong>${t.title}</strong><small>${t.unit}</small></td><td><span class="badge gray">${t.category}</span></td><td><strong>${formatDate(t.deadline)}</strong><small>${t.deadline < "2026-01-21" ? "Dekat" : ""}</small></td><td>${statusBadge(t.priority)}</td><td>${statusBadge(t.status)}</td><td><button class="btn primary" data-task-detail="${t.id}">Kerjakan</button></td></tr>`).join("")}</tbody></table></div>`;
}
function reportTable(reports) {
  return `<div class="table-wrap"><table><thead><tr><th>Kegiatan</th><th>Status</th><th>Tag</th></tr></thead><tbody>${reports.map(r => `<tr><td><strong>${r.title}</strong><small>${formatDate(r.date)} • ${r.unit}</small></td><td>${statusBadge(r.status)}</td><td>${r.tag}</td></tr>`).join("")}</tbody></table></div>`;
}
function renderTasks() {
  const tasks = tasksForRole();
  $("#pageContent").innerHTML = `
    ${pageHeader("Tugas Saya", "Kelola penugasan, verifikasi laporan, dan deadline aktivitas Anda dalam satu tempat.", rolePermissions[state.role].assign ? `<button class="btn primary" data-page="assign">+ Beri Tugas</button>` : "")}
    <div class="kpi-grid">
      ${kpi("Total Tugas", tasks.length, "+2 dari bulan lalu", "▣")}
      ${kpi("Mendekati Deadline", tasks.filter(t => t.priority === "Tinggi").length, "Segera selesaikan", "⏰", "danger")}
      ${kpi("Butuh Revisi", tasks.filter(t => t.status === "Perlu Revisi").length + 3, "Laporan perlu diperbaiki", "≡", "warning")}
      ${kpi("Selesai Bulan Ini", tasks.filter(t => t.status === "Selesai").length + 12, "Pencapaian luar biasa", "✓", "success")}
    </div>
    <div class="grid-2">
      <div>
        <div class="tabs"><button class="tab active">Semua Tugas</button><button class="tab">Sedang Berjalan</button><button class="tab">Menunggu Verifikasi</button><button class="tab">Selesai</button></div>
        <div class="panel">${taskTable(tasks)}</div>
      </div>
      <aside>
        <div class="panel"><div class="panel-header"><h3>Kalender Deadline</h3><span>‹ ›</span></div><div class="panel-body">${calendarMock()}</div></div>
        <div class="panel" style="margin-top:24px"><div class="panel-header tint"><h3>⚡ Tugas Mendesak</h3></div><div class="panel-body timeline-card">${tasks.slice(0,3).map((t, i) => `<div class="deadline-item"><span class="deadline-dot ${i===0 ? "danger" : i===1 ? "" : "warning"}"></span><div><strong>${t.title}</strong><span>${t.desc.slice(0,62)}...</span></div></div>`).join("")}</div></div>
      </aside>
    </div>
  `;
}
function calendarMock() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return `<div style="text-align:center;font-weight:800;color:#34445e;margin-bottom:16px">Januari 2026</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;text-align:center;font-size:12px;color:#667085">${["M","S","S","R","K","J","S"].map(d=>`<b>${d}</b>`).join("")}${days.map(d => `<span style="padding:8px;border-radius:4px;${d===15?'background:#ef4444;color:#fff;':d===20?'background:#003c82;color:#fff;':d===25?'background:#dbeafe;color:#003c82;':''}">${d}</span>`).join("")}</div>`;
}
function renderTaskDetail(id) {
  state.page = "task-detail";
  const t = state.tasks.find(x => x.id === id) || state.tasks[0];
  const activity = activityById(t.activityId);
  $("#pageContent").innerHTML = `
    <button class="btn ghost" data-page="tasks">← Kembali ke Tugas Saya</button>
    <div class="page-title" style="margin-top:24px"><div><h2 class="task-detail-title">${t.title}</h2><div class="meta-row"><span>ID Tugas: #${t.id.toUpperCase()}</span>${statusBadge(`Prioritas: ${t.priority}`.replace('Prioritas: ', t.priority))}<span class="badge process">${t.category}</span></div></div></div>
    <div class="task-layout">
      <div>
        <div class="task-box"><h4>TASK OVERVIEW</h4><div class="task-overview"><div class="overview-item"><div class="overview-icon">📅</div><div><small>Deadline</small><strong>${formatDate(t.deadline)}</strong></div></div><div class="overview-item"><div class="overview-icon">👤</div><div><small>Pemberi Tugas</small><strong>${t.from}</strong></div></div></div></div>
        <div class="task-box"><h4>DETAIL INSTRUKSI</h4><p style="line-height:1.7">${t.desc}</p><p style="line-height:1.7">Kegiatan ini terhubung ke katalog: <b>${activity?.indicator.name || "Indikator"} → ${activity?.output.name || "Output"} → ${activity?.name || "Kegiatan"}</b>.</p><div class="note"><b>Catatan Penting</b><br/>Bukti minimal: ${activity?.evidence || "File laporan atau URL pendukung"}.</div></div>
        <div class="task-box"><h4>LAMPIRAN DOKUMEN</h4><div class="catalog-activity"><div><strong>Daftar_Panitia_WCU_2026.pdf</strong><br/><small>1.2 MB • Diunggah 15 Jan 2026</small></div><button class="btn secondary">Unduh</button></div></div>
      </div>
      <aside>
        <div class="status-card"><h4>STATUS TUGAS</h4><h3>${t.status}</h3><p>Progress estimasi: ${t.progress}%</p><div class="status-actions"><button class="btn primary" onclick="updateTaskStatus('${t.id}','Sedang Dikerjakan')">▷ Lanjutkan Pengerjaan</button><button class="btn secondary" onclick="updateTaskStatus('${t.id}','Menunggu Review')">➤ Kirim Hasil / Laporan</button><button class="btn ghost" onclick="updateTaskStatus('${t.id}','Perlu Revisi')">Ajukan Revisi Instruksi</button></div></div>
        <div class="panel"><div class="panel-header"><h3>Riwayat Aktivitas</h3></div><div class="panel-body activity-history"><div class="row"><span class="timeline-dot success">✓</span><div><strong>Tugas Dimulai</strong><br/><small>${roleProfiles[state.role].name} mengubah status ke berjalan.</small></div></div><div class="row"><span class="timeline-dot">+</span><div><strong>Penugasan Dibuat</strong><br/><small>Oleh ${t.from}</small></div></div></div></div>
      </aside>
    </div>
  `;
}
window.updateTaskStatus = function(id, status) {
  const t = state.tasks.find(x => x.id === id);
  if (t) {
    t.status = status;
    if (status === "Sedang Dikerjakan") t.progress = Math.max(t.progress, 40);
    if (status === "Menunggu Review") t.progress = 90;
    save("fsm_tasks", state.tasks);
    toast(`Status tugas diubah menjadi ${status}`);
    renderTaskDetail(id);
  }
}

function renderAssign() {
  const activities = allActivities();
  $("#pageContent").innerHTML = `
    ${pageHeader("Beri Tugas", "Buat penugasan baru sesuai hirarki dan kewenangan role aktif.")}
    <div class="form-card">
      <div class="form-grid">
        <div class="form-field"><label>Judul Tugas</label><input id="assignTitle" placeholder="Contoh: Pengisian data WCU Summer Course" /></div>
        <div class="form-field"><label>Penerima Tugas</label><select id="assignTo">${assignableTargets().map(r => `<option>${r}</option>`).join("")}</select></div>
        <div class="form-field"><label>Kegiatan Terkait</label><select id="assignActivity">${activities.map(a => `<option value="${a.id}">${a.indicator.name} → ${a.output.name} → ${a.name}</option>`).join("")}</select></div>
        <div class="form-field"><label>Deadline</label><input id="assignDeadline" type="date" value="2026-02-01" /></div>
        <div class="form-field"><label>Prioritas</label><select id="assignPriority"><option>Normal</option><option>Tinggi</option></select></div>
        <div class="form-field"><label>Kategori</label><input id="assignCategory" placeholder="Akademik / Administrasi / WCU" /></div>
      </div>
      <div class="form-field"><label>Instruksi</label><textarea id="assignDesc" placeholder="Tuliskan instruksi tugas secara jelas..."></textarea></div>
      <div class="note">Tugas yang dibuat akan muncul di menu <b>Tugas Saya</b> milik penerima. Jika kegiatan terhubung ke katalog, bukti minimal otomatis mengikuti konfigurasi kegiatan.</div>
      <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:24px"><button class="btn secondary" data-page="dashboard">Batal</button><button class="btn primary" onclick="createAssignment()">Kirim Tugas</button></div>
    </div>
  `;
}
function assignableTargets() {
  if (state.role === "Dekan") return ["Wakil Dekan", "Kaprodi", "Supervisor", "Dosen", "Staff"];
  if (state.role === "Wakil Dekan") return ["Kaprodi", "Supervisor", "Dosen", "Staff"];
  if (state.role === "Kaprodi") return ["Dosen"];
  if (state.role === "Supervisor") return ["Staff"];
  return ["Dosen", "Staff"];
}
window.createAssignment = function() {
  const title = $("#assignTitle").value.trim();
  if (!title) return toast("Judul tugas wajib diisi");
  const activity = activityById($("#assignActivity").value);
  state.tasks.unshift({
    id: `tsk-${Date.now()}`,
    title,
    category: $("#assignCategory").value || activity?.indicator.type || "Umum",
    activityId: $("#assignActivity").value,
    from: state.role,
    to: $("#assignTo").value,
    unit: roleProfiles[$("#assignTo").value]?.unit || "Unit terkait",
    deadline: $("#assignDeadline").value,
    priority: $("#assignPriority").value,
    status: "Baru",
    progress: 0,
    desc: $("#assignDesc").value || "Instruksi tugas belum diisi.",
  });
  save("fsm_tasks", state.tasks);
  toast("Tugas berhasil dibuat");
  setPage("tasks");
}

function renderReports() {
  const reports = reportsForRole();
  $("#pageContent").innerHTML = `
    ${pageHeader("Laporan Kegiatan", "Daftar laporan mandiri yang terhubung ke katalog indikator, output, dan kegiatan claimable.", `<button class="btn primary" data-page="report-form">+ Buat Laporan</button>`)}
    <div class="panel">${reportTable(reports)}</div>
  `;
}
function renderReportForm(step = 1) {
  state.page = "report-form";
  state.formStep = step;
  const activities = allActivities();
  const selected = activityById(state.selectedActivity) || activities[0];
  let body = "";
  if (step === 1) {
    body = `<h2>Pilih Kegiatan</h2><p>Silakan pilih jenis kegiatan yang ingin Anda laporkan.</p><div class="form-field"><input placeholder="Cari nama kegiatan atau kode indikator..." /></div><div class="activity-cards">${activities.map(a => `<div class="activity-card ${selected?.id===a.id?"selected":""}" data-activity="${a.id}"><div class="radio"></div><div>${statusBadge(a.indicator.type)} ${statusBadge(a.mode)}</div><h4>${a.name}</h4><p>${a.output.desc}</p></div>`).join("")}</div>`;
  } else if (step === 2) {
    body = `<h2>Isi Detail Kegiatan</h2><p>Masukkan informasi dasar mengenai pelaksanaan kegiatan.</p><div class="form-field"><label>Nama Kegiatan / Publikasi</label><input id="reportTitle" value="${selected?.name || ""}" /></div><div class="form-grid"><div class="form-field"><label>Tanggal Pelaksanaan</label><input id="reportDate" type="date" value="2026-01-28" /></div><div class="form-field"><label>Peran / Kontribusi</label><select id="reportRole"><option>PIC</option><option>Ketua</option><option>Anggota</option><option>Narasumber</option><option>Penulis Utama</option></select></div></div><div class="form-field"><label>Deskripsi Singkat</label><textarea id="reportDesc" placeholder="Jelaskan output dan dampak kegiatan ini..."></textarea></div><div class="form-field"><label>Tautan Pendukung Opsional</label><input id="reportUrl" placeholder="https://example.com/bukti" /></div>`;
  } else if (step === 3) {
    body = `<h2>Identitas Unik Kegiatan</h2><p>Masukkan kunci unik seperti DOI, Nomor SK/ST, URL, atau kode dokumen untuk mencegah duplikasi data.</p><div class="form-field"><label>Jenis Identitas Unik</label><select><option>DOI</option><option>Nomor SK/ST</option><option>URL</option><option>Nomor Kontrak</option><option>Kode Dokumen</option></select></div><div class="form-field"><label>Nomor / Kunci Unik</label><div style="display:grid;grid-template-columns:1fr 220px;gap:14px"><input placeholder="Contoh: 10.1234/5678.90 atau 142/UN7/2026" /><button class="btn secondary" onclick="toast('Tidak ditemukan duplikasi pada data dummy')">⚙ Cek Duplikasi</button></div><small>Sistem akan memverifikasi apakah data ini sudah pernah dilaporkan sebelumnya.</small></div>`;
  } else if (step === 4) {
    body = `<h2>Unggah Bukti</h2><p>Bukti minimal mengikuti konfigurasi katalog kegiatan.</p><div class="note"><b>Bukti minimal untuk ${selected?.name}</b><br/>${selected?.evidence}</div><div class="form-grid" style="margin-top:22px"><div class="form-field"><label>Upload File</label><input type="file" multiple /></div><div class="form-field"><label>Catatan Bukti</label><input placeholder="Contoh: bukti sudah sesuai checklist" /></div></div>`;
  } else {
    body = `<h2>Review Laporan</h2><p>Pastikan data sudah benar sebelum dikirim ke verifikator.</p><div class="catalog-item"><div class="catalog-head"><div><strong>${selected?.indicator.name}</strong><br/><small>${selected?.output.name} → ${selected?.name}</small></div>${statusBadge(selected?.mode || "Mandiri")}</div><div class="catalog-output"><strong>Bukti minimal</strong><p>${selected?.evidence}</p><strong>Verifikator default</strong><p>${selected?.verifier}</p></div></div>`;
  }
  $("#pageContent").innerHTML = `
    ${pageHeader("Buat Laporan Kegiatan", "Stepper pelaporan berbasis katalog, bukan upload angka IKU.")}
    ${stepper(step)}
    <div class="form-card">
      ${body}
      <div style="display:flex;justify-content:space-between;gap:12px;margin-top:28px;border-top:1px solid var(--line);padding-top:22px">
        <button class="btn secondary" onclick="renderReportForm(${Math.max(1, step - 1)})">← Kembali</button>
        ${step < 5 ? `<button class="btn primary" onclick="renderReportForm(${step + 1})">Lanjutkan →</button>` : `<button class="btn primary" onclick="submitReport()">Kirim Laporan</button>`}
      </div>
    </div>
  `;
}
function stepper(active) {
  const labels = ["Pilih Kegiatan", "Detail Kegiatan", "Identitas Unik", "Unggah Bukti", "Review"];
  return `<div class="stepper">${labels.map((l, i) => `<div class="step ${i+1===active?'active':i+1<active?'done':''}"><span>${i+1<active?'✓':i+1}</span>${l}</div>`).join("")}</div>`;
}
window.submitReport = function() {
  const activity = activityById(state.selectedActivity) || allActivities()[0];
  state.reports.unshift({
    id: `rep-${Date.now()}`,
    title: activity.name,
    activityId: activity.id,
    reporter: state.role,
    unit: roleProfiles[state.role].unit,
    date: "2026-01-28",
    status: "Sedang Direview",
    tag: activity.indicator.type,
    desc: `Laporan kegiatan ${activity.name}`,
  });
  save("fsm_reports", state.reports);
  toast("Laporan berhasil dikirim ke verifikator");
  setPage("reports");
}

function renderLogbook() {
  $("#pageContent").innerHTML = `
    ${pageHeader("Logbook", "Catat aktivitas harian atau pekerjaan rutin yang tidak selalu menjadi klaim strategis.", `<button class="btn primary">+ Tambah Logbook</button>`)}
    <div class="panel"><div class="panel-header"><h3>Logbook Minggu Ini</h3></div><div class="panel-body timeline-list"><div class="timeline-item"><div class="timeline-dot success">✓</div><div><h4>Pengarsipan dokumen akademik</h4><p>2 jam • Administrasi akademik</p><time>Hari ini</time></div></div><div class="timeline-item"><div class="timeline-dot">↗</div><div><h4>Input data kegiatan WCU</h4><p>3 jam • Data kinerja</p><time>Kemarin</time></div></div></div></div>`;
}
function renderPortfolio() {
  const reports = reportsForRole();
  const tasks = tasksForRole();
  $("#pageContent").innerHTML = `
    ${pageHeader("Portofolio Individu", "Rekap kontribusi dari tugas selesai, laporan terverifikasi, dan bukti yang dapat ditelusuri.")}
    <div class="kpi-grid">
      ${kpi("Tugas Selesai", tasks.filter(t=>t.status==="Selesai" || t.status==="Menunggu Review").length, "Dari tugas yang diterima", "✓", "success")}
      ${kpi("Laporan Tervalidasi", reports.filter(r=>r.status==="Terverifikasi").length, "Masuk portofolio", "▤", "success")}
      ${kpi("Butuh Revisi", reports.filter(r=>r.status==="Perlu Revisi").length, "Perlu perbaikan", "!", "warning")}
      ${kpi("Evidence Readiness", "82%", "Bukti lengkap", "▣")}
    </div>
    <div class="grid-2-even"><div class="panel"><div class="panel-header"><h3>Kontribusi per Kategori</h3></div><div class="panel-body">${barList([{n:"Akademik",v:78},{n:"Riset",v:64},{n:"WCU",v:52},{n:"Layanan",v:88}])}</div></div><div class="panel"><div class="panel-header"><h3>Riwayat Kontribusi</h3></div>${reportTable(reports)}</div></div>`;
}
function renderCatalog() {
  $("#pageContent").innerHTML = `${pageHeader("Katalog Kegiatan", "Struktur fleksibel: Indikator → Output → Kegiatan Claimable → Bukti Minimal → Verifikator.", rolePermissions[state.role].admin ? `<button class="btn primary" data-page="admin">+ Kelola Katalog</button>` : "")}${catalogTree()}`;
}
function catalogTree() {
  return `<div class="catalog-tree">${state.catalog.map(ind => `<div class="catalog-item"><div class="catalog-head"><div><strong>${ind.name}</strong><br/><small>${ind.type} • ${ind.year}</small></div>${statusBadge(ind.status)}</div>${ind.outputs.map(out => `<div class="catalog-output"><strong>${out.name}</strong><p>${out.desc}</p><div class="catalog-activities">${out.activities.map(act => `<div class="catalog-activity"><div><strong>${act.name}</strong><br/><small>Mode: ${act.mode} • Bukti: ${act.evidence}</small></div><span class="badge process">${act.verifier}</span></div>`).join("")}</div></div>`).join("")}</div>`).join("")}</div>`;
}
function renderVerification() {
  const queue = reportsForRole().filter(r => r.status !== "Terverifikasi");
  $("#pageContent").innerHTML = `
    ${pageHeader("Verifikasi", "Queue laporan dan hasil tugas yang membutuhkan review bukti.")}
    <div class="panel"><div class="table-wrap"><table><thead><tr><th>Laporan</th><th>Pelapor</th><th>Tag</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${queue.map(r => `<tr><td><strong>${r.title}</strong><small>${r.desc}</small></td><td>${r.reporter}<br/><small>${r.unit}</small></td><td>${r.tag}</td><td>${statusBadge(r.status)}</td><td><button class="btn primary" onclick="verifyReport('${r.id}','Terverifikasi')">Setujui</button> <button class="btn secondary" onclick="verifyReport('${r.id}','Perlu Revisi')">Revisi</button></td></tr>`).join("")}</tbody></table></div></div>`;
}
window.verifyReport = function(id, status) {
  const r = state.reports.find(x => x.id === id);
  if (r) { r.status = status; save("fsm_reports", state.reports); toast(`Laporan ${status}`); renderVerification(); }
}
function renderMonitoring() {
  $("#pageContent").innerHTML = `
    ${pageHeader("Monitoring Unit", "Pantau performa unit/individu, pekerjaan terlambat, dan progres berdasarkan katalog kegiatan.", `<button class="btn secondary">Ekspor</button><button class="btn primary" data-page="assign">+ Quick Assignment</button>`)}
    <div class="kpi-grid">
      ${kpi("Total Tugas", state.tasks.length, "Lintas unit", "▣")}
      ${kpi("Overdue / Prioritas", state.tasks.filter(t=>t.priority==="Tinggi").length, "Perlu perhatian", "!", "danger")}
      ${kpi("Laporan Pending", state.reports.filter(r=>r.status!=="Terverifikasi").length, "Menunggu verifikasi", "↻", "warning")}
      ${kpi("Katalog Aktif", allActivities().length, "Kegiatan claimable", "▰", "success")}
    </div>
    <div class="monitor-grid"><div class="panel"><div class="panel-header"><h3>Progress per Unit</h3></div><div class="panel-body">${barList([{n:"Informatika",v:84},{n:"Biologi",v:72},{n:"Kimia",v:78},{n:"Fisika",v:66},{n:"Statistika",v:88}])}</div></div><div class="panel"><div class="panel-header"><h3>Top Contributor</h3></div><div class="panel-body person-list">${["Dr. Budi Santoso","Mba Alik","Dr. Rina Kusumawati","Pak Nurhadi"].map((n,i)=>`<div class="person"><div class="left"><div class="avatar">${n.split(' ').slice(-1)[0][0]}</div><div><strong>${n}</strong><small>${["Dosen","Staff","Kaprodi","Supervisor"][i]}</small></div></div><span class="badge success">${42-i*5} kontribusi</span></div>`).join("")}</div></div></div>
  `;
}
function barList(items) {
  return `<div class="bar-list">${items.map(i => `<div class="bar-row"><strong>${i.n}</strong><div class="bar-track"><div class="bar-fill" style="width:${i.v}%"></div></div><span>${i.v}%</span></div>`).join("")}</div>`;
}
function renderAdmin() {
  const indicators = state.catalog;
  const firstInd = indicators[0];
  const firstOut = firstInd?.outputs[0];
  $("#pageContent").innerHTML = `
    ${pageHeader("Admin Katalog", "Kelola indikator, output, kegiatan claimable, bukti minimal, dan verifikator agar sistem tetap fleksibel.")}
    <div class="grid-2-even">
      <div class="form-card">
        <h2>Tambah Kegiatan Claimable</h2>
        <div class="form-field"><label>Indikator</label><select id="adminIndicator">${state.catalog.map(i => `<option value="${i.id}">${i.name}</option>`).join("")}</select></div>
        <div class="form-field"><label>Output</label><select id="adminOutput">${firstInd.outputs.map(o => `<option value="${o.id}">${o.name}</option>`).join("")}</select></div>
        <div class="form-field"><label>Nama Kegiatan</label><input id="adminActivity" placeholder="Contoh: Menjadi PIC kegiatan internasional" /></div>
        <div class="form-grid"><div class="form-field"><label>Mode</label><select id="adminMode"><option>Mandiri</option><option>Penugasan</option><option>Logbook</option><option>Unit/Tim</option></select></div><div class="form-field"><label>Verifikator</label><input id="adminVerifier" placeholder="Kaprodi / Supervisor / WD" /></div></div>
        <div class="form-field"><label>Bukti Minimal</label><input id="adminEvidence" placeholder="SK/ST, laporan, URL, dokumentasi" /></div>
        <button class="btn primary" onclick="addCatalogActivity()">+ Tambah ke Katalog</button>
      </div>
      <div class="panel"><div class="panel-header"><h3>Health Check Master Data</h3></div><div class="panel-body">${barList([{n:"Indikator aktif",v:92},{n:"Output terisi",v:88},{n:"Bukti minimal",v:76},{n:"Verifikator",v:82}])}<div class="note">Kegiatan baru yang ditambahkan akan tersimpan di localStorage dan langsung muncul pada form penugasan/laporan.</div></div></div>
    </div>
    <div style="margin-top:24px">${catalogTree()}</div>
  `;
  $("#adminIndicator").addEventListener("change", e => {
    const ind = state.catalog.find(i => i.id === e.target.value);
    $("#adminOutput").innerHTML = ind.outputs.map(o => `<option value="${o.id}">${o.name}</option>`).join("");
  });
}
window.addCatalogActivity = function() {
  const name = $("#adminActivity").value.trim();
  if (!name) return toast("Nama kegiatan wajib diisi");
  const ind = state.catalog.find(i => i.id === $("#adminIndicator").value);
  const out = ind.outputs.find(o => o.id === $("#adminOutput").value);
  out.activities.push({ id: `act-${Date.now()}`, name, mode: $("#adminMode").value, evidence: $("#adminEvidence").value || "Bukti pendukung", verifier: $("#adminVerifier").value || "Admin" });
  save("fsm_catalog", state.catalog);
  toast("Kegiatan baru berhasil ditambahkan");
  renderAdmin();
}

init();
