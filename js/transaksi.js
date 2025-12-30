const content=document.querySelector(".content")
const summary=document.querySelectorAll(".summary-box b")
let data=JSON.parse(localStorage.getItem("trx"))||[]

render()

function render(){
  content.innerHTML=""
  let masuk=0,keluar=0

  if(data.length===0){
    content.innerHTML=`
      <div class="empty">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png">
        <p>Tidak ada data</p>
      </div>`
  }

  data.forEach((d,i)=>{
    d.jenis==="pemasukan"?masuk+=d.nominal:keluar+=d.nominal
    content.innerHTML+=`
      <div class="transaction-item">
        <div>
          <b>${d.kategori}</b>
          <small>${d.judul}</small>
        </div>
        <div>
          <span class="${d.jenis==="pemasukan"?"plus":"minus"}">
            ${d.jenis==="pemasukan"?"+":"-"}${d.nominal}
          </span>
          <span class="dots" onclick="hapus(${i})">⋮</span>
        </div>
      </div>`
  })

  summary[0].innerText=masuk
  summary[1].innerText=keluar
  summary[2].innerText=masuk-keluar
}

function hapus(i){
  if(confirm("Hapus data?")){
    data.splice(i,1)
    simpan()
  }
}

function simpan(){
  localStorage.setItem("trx",JSON.stringify(data))
  render()
}

document.querySelector(".fab").onclick = () => {
  location.href = "tambah-transaksi.html"
}


