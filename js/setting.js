// === TEMA ===
function setTema(mode) {
  localStorage.setItem("tema", mode);
  applyTema();
}

function applyTema() {
  const tema = localStorage.getItem("tema") || "terang";
  const body = document.body;

  if (tema === "gelap") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}

applyTema();

// === BAHASA (DUMMY) ===
function setBahasa(lang) {
  localStorage.setItem("bahasa", lang);
  alert("Bahasa disimpan (dummy)");
}

// === UBAH PIN ===
function ubahPin() {
  const pinLama = prompt("Masukkan PIN lama");
  if (pinLama !== localStorage.getItem("pin")) {
    alert("PIN salah");
    return;
  }

  const pinBaru = prompt("Masukkan PIN baru");
  if (pinBaru) {
    localStorage.setItem("pin", pinBaru);
    alert("PIN berhasil diubah");
  }
}

// === BACKUP (DUMMY) ===
function backupData() {
  const pin = prompt("Masukkan PIN");
  if (pin === localStorage.getItem("pin")) {
    alert("Backup berhasil (dummy)");
  } else {
    alert("PIN salah");
  }
}
