function simpanHutang(){
  const data = {
    tanggal: document.getElementById("tanggal").value,
    nama: document.getElementById("nama").value,
    jenis: document.getElementById("jenis").value,
    nominal: parseInt(document.getElementById("nominal").value),
    metode: document.getElementById("metode").value,
    deskripsi: document.getElementById("deskripsi").value,
    lunas: false
  }

  if(!data.nama || !data.nominal){
    alert("Lengkapi data")
    return
  }

  let hutang = JSON.parse(localStorage.getItem("hutang")) || []
  hutang.push(data)
  localStorage.setItem("hutang", JSON.stringify(hutang))

  location.href = "hutang.html"
}
function batalHutang() {
  window.location.href = "hutang.html";
}
