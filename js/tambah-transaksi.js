function simpan(){
  const data = {
    tanggal: document.getElementById("tanggal").value,
    jenis: document.getElementById("jenis").value,
    kategori: document.getElementById("kategori").value,
    judul: document.getElementById("judul").value,
    nominal: parseInt(document.getElementById("nominal").value),
    metode: document.getElementById("metode").value,
    deskripsi: document.getElementById("deskripsi").value
  }

  if(!data.kategori || !data.judul || !data.nominal){
    alert("Lengkapi data")
    return
  }

  let trx = JSON.parse(localStorage.getItem("trx")) || []
  trx.push(data)
  localStorage.setItem("trx", JSON.stringify(trx))

  location.href = "transaksi.html"
}
function batalTransaksi() {
  window.location.href = "transaksi.html";
}
