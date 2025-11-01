// ✅ Show thank you after UPI click
document.getElementById("upiBtn").addEventListener("click", () => {
  Swal.fire({
    icon: "success",
    title: "🙏 Thank You!",
    text: "Your generous contributions keep our faith alive. Thank you for your support and blessings!",
    confirmButtonColor: "#ff7b00"
  });
});

// ✅ Show QR code popup
document.getElementById("qrBtn").addEventListener("click", () => {
  Swal.fire({
    title: "📱 Scan to Donate",
    text: "Use this QR code to make your donation.",
    imageUrl: "qr.jpg", // your QR image
    imageWidth: 250,
    imageHeight: 250,
    confirmButtonText: "Done",
    confirmButtonColor: "#ff7b00",
    background: "#1a1a1a",
    color: "#fff",
  });
});

// ✅ Show bank account popup
document.getElementById("bankBtn").addEventListener("click", () => {
  Swal.fire({
    title: "🏦 Bank Account Details",
    html: `
      <p style="font-size:1.1rem; color:#ffd369;">Bank Name: Divine Trust Bank</p>
      <p style="font-size:1rem; color:#fff;">A/C No: <b>000111222333</b></p>
      <p style="font-size:1rem; color:#fff;">IFSC: DIVT0000123</p>
      <p style="font-size:1rem; color:#fff;">Branch: Pandharpur</p>
    `,
    confirmButtonText: "OK",
    confirmButtonColor: "#ff7b00",
    background: "#1a1a1a",
    color: "#fff"
  });
});
