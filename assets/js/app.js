const affirmations = [
  "Jangan menunggu waktu yang tepat, karena waktu terbaik adalah sekarang.",
  "Lelah boleh, tapi menyerah bukan pilihan.",
  "Setiap langkah kecil hari ini, mendekatkanmu pada impian besar esok hari.",
  "Proses memang berat, tapi hasilnya pantas untuk diperjuangkan.",
  "Saya punya potensi besar untuk sukses dan bahagia."
];

function generatePassword() {
  document.getElementById("password").textContent = "⏳ Memproses...";

  setTimeout(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charLength = parseInt(document.getElementById("charLength").value) || 9;
    let pwd = "";
    while (true) {
      pwd = "";
      for (let i = 0; i < charLength; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd)) break;
    }

    document.getElementById("password").textContent = pwd;

    const canvas = document.getElementById("qrcodeCanvas");
    canvas.width = 2611;
    canvas.height = 3264;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const ssid = "SRC RIZQI";
    const wifiFormat = `WIFI:T:WPA;S:${ssid};P:${pwd};;`;

    const visibleQR = document.getElementById("visibleQR");
    visibleQR.innerHTML = "";

    new QRCode(visibleQR, {
      text: wifiFormat,
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
      const qrImg = visibleQR.querySelector("img");
      if (qrImg && qrImg.src) {
        const img = new Image();
        img.onload = function () {
          const qrSize = 2200;
          const fontSize = 360;
          const spaceBetween = 200;
          const centerX = canvas.width / 2;
          const totalHeight = qrSize + fontSize + spaceBetween;
          const startY = (canvas.height - totalHeight) / 2;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = "#000000";
          ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(pwd, centerX, startY + fontSize);

          ctx.drawImage(img, centerX - qrSize / 2, startY + fontSize + spaceBetween, qrSize, qrSize);
        };
        img.src = qrImg.src;
      }
    }, 800); // delay lebih panjang agar aman di mobile

    const copyBtn = document.querySelector(".copy");
    const copyIcon = document.getElementById("copyIcon");
    copyBtn.classList.remove("copied");
    copyIcon.textContent = "📋";

    document.getElementById("copyBtn").style.display = "inline-block";
    document.getElementById("downloadBtn").style.display = "inline-block";

  }, 3000);
}

function copyPassword() {
  const text = document.getElementById("password").textContent;
  navigator.clipboard.writeText(text);
  const btn = document.querySelector(".copy");
  const icon = document.getElementById("copyIcon");
  btn.classList.add("copied");
  icon.textContent = "✔️";
}

function downloadQRCode() {
  const canvas = document.getElementById("qrcodeCanvas");
  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = canvas.toDataURL();
  link.click();
}

window.onload = () => {
  const now = new Date();
  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const hari = days[now.getDay()];
  const tanggal = now.getDate();
  const bulan = months[now.getMonth()];
  const tahun = now.getFullYear();
  document.getElementById("tanggalLengkap").textContent = `${hari}, ${tanggal} ${bulan} ${tahun}`;

  let currentAffirmation = 0;
  const affElement = document.getElementById("affirmation");

  function updateAffirmation() {
    affElement.style.opacity = 0;
    setTimeout(() => {
      affElement.textContent = affirmations[currentAffirmation];
      affElement.style.opacity = 1;
      currentAffirmation = (currentAffirmation + 1) % affirmations.length;
    }, 500);
  }

  setInterval(updateAffirmation, 5000);
  updateAffirmation();

  const charLengthSlider = document.getElementById("charLength");
  const charValueDisplay = document.getElementById("charValue");
  charLengthSlider.addEventListener("input", () => {
    charValueDisplay.textContent = charLengthSlider.value;
  });
};
