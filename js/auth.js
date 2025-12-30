function goToPin(){
  location.href="pin.html"
}

if(location.pathname.includes("pin.html")){
  const title=document.getElementById("title")
  if(!localStorage.getItem("pin")) title.innerText="Buat PIN Baru"
}

function submitPin(){
  const input=document.getElementById("pinInput").value
  const saved=localStorage.getItem("pin")
  if(!input) return alert("PIN kosong")

  if(!saved){
    localStorage.setItem("pin",input)
    location.href="transaksi.html"
  }else{
    if(input===saved) location.href="transaksi.html"
    else alert("PIN salah")
  }
}
