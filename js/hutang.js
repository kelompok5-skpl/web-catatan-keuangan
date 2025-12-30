const content = document.querySelector(".content")
let hutang = JSON.parse(localStorage.getItem("hutang")) || []

render()

function render(){
  content.innerHTML = ""

  if(hutang.length === 0){
    content.innerHTML = `
      <div class="empty">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png">
        <p>Tidak ada data</p>
      </div>
    `
    return
  }

  hutang.forEach((h, i) => {
    content.innerHTML += `
      <div class="transaction-item">
        <div>
          <b>${h.nama}</b>
          <small>${h.deskripsi || h.jenis}</small>
        </div>

        <div style="text-align:right">
          <span class="${h.jenis === 'Menerima' ? 'plus' : 'minus'}">
            ${h.jenis === 'Menerima' ? '+' : '-'}${formatRupiah(h.nominal)}
          </span><br>
          <small style="color:${h.lunas ? 'green' : 'red'}">
            ${h.lunas ? 'Lunas' : 'Belum lunas'}
          </small>
          <span class="dots" onclick="toggleLunas(${i})">⋮</span>
        </div>
      </div>
    `
  })
}

function toggleLunas(i){
  hutang[i].lunas = !hutang[i].lunas
  localStorage.setItem("hutang", JSON.stringify(hutang))
  render()
}

function formatRupiah(angka){
  return Number(angka).toLocaleString("id-ID")
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("addHutang");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "tambah-hutang.html";
    });
  }
});
