const transaksi = JSON.parse(localStorage.getItem("trx")) || [];
const filterEl = document.getElementById("filter");
const grafikEl = document.getElementById("grafik");
const tabelEl = document.getElementById("tabel");

const totalMasukEl = document.getElementById("totalMasuk");
const totalKeluarEl = document.getElementById("totalKeluar");
const selisihEl = document.getElementById("selisih");

let currentFilter = "harian";
function toggleSortir() {
  const menu = document.getElementById("sortirMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function setFilter(type) {
  currentFilter = type;
  document.getElementById("sortirMenu").style.display = "none";
  render();
}


filterEl.onchange = render;
render();

function render() {
  const mode = currentFilter;
  const groups = groupData(mode);

  grafikEl.innerHTML = "";
  tabelEl.innerHTML = "";

  let totalMasuk = 0;
  let totalKeluar = 0;

  const maxVal = Math.max(
    ...Object.values(groups).map(g => Math.max(g.masuk, g.keluar)),
    1
  );

  Object.keys(groups).forEach(label => {
    const g = groups[label];
    totalMasuk += g.masuk;
    totalKeluar += g.keluar;

    // grafik
    grafikEl.innerHTML += `
      <div class="group">
        <div class="label">${label}</div>
        <div class="bar masuk" style="width:${(g.masuk/maxVal)*100}%">
          ${format(g.masuk)}
        </div>
        <div class="bar keluar" style="width:${(g.keluar/maxVal)*100}%">
          ${format(g.keluar)}
        </div>
      </div>
    `;

    // tabel
    tabelEl.innerHTML += `
      <tr>
        <td>${label}</td>
        <td class="plus">${format(g.masuk)}</td>
        <td class="minus">${format(g.keluar)}</td>
        <td>${format(g.masuk - g.keluar)}</td>
      </tr>
    `;
  });

  totalMasukEl.innerText = format(totalMasuk);
  totalKeluarEl.innerText = format(totalKeluar);
  selisihEl.innerText = format(totalMasuk - totalKeluar);
}

// === GROUPING ===
function groupData(mode) {
  const map = {};

  transaksi.forEach(t => {
    const d = new Date(t.tanggal);
    let key = "";

    if (mode === "harian") {
      key = d.toLocaleDateString("id-ID");
    } 
    else if (mode === "mingguan") {
      key = "Minggu " + Math.ceil(d.getDate() / 7);
    } 
    else if (mode === "bulanan") {
      key = d.toLocaleString("id-ID", { month: "long", year: "numeric" });
    } 
    else {
      key = d.getFullYear();
    }

    if (!map[key]) map[key] = { masuk: 0, keluar: 0 };

    if (t.jenis === "pemasukan") map[key].masuk += Number(t.nominal);
    else map[key].keluar += Number(t.nominal);
  });

  return map;
}

function format(n) {
  return Number(n).toLocaleString("id-ID");
}
