document.getElementById("downloadBtn").addEventListener("click", async () => {
    const videoUrl = document.getElementById("videoUrl").value;
    const previewContainer = document.getElementById("preview");
    const loading = document.getElementById("loading");

    if (!videoUrl) {
        alert("Masukkan URL video TikTok!");
        return;
    }

    loading.style.display = "block";
    previewContainer.innerHTML = "";

    try {
        const response = await fetch(`https://api.siputzx.my.id/api/tiktok?url=${videoUrl}`);
        const data = await response.json();

        if (data.status && data.data.success) {
            const videoSource = data.data.urls[0];

            previewContainer.innerHTML = `
                <video controls>
                    <source src="${videoSource}" type="video/mp4">
                    Browser Anda tidak mendukung pemutaran video.
                </video>
                <a id="directDownload" href="${videoSource}" download="TikTok_Video.mp4" class="download-btn">Download Video</a>
            `;

            // Memaksa browser mengunduh file
            document.getElementById("directDownload").addEventListener("click", async (event) => {
                event.preventDefault();
                const response = await fetch(videoSource);
                const blob = await response.blob();
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "CreatedByAkbarz.mp4";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

        } else {
            alert("Gagal mengambil video! Coba lagi.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan, periksa koneksi internet Anda.");
    } finally {
        loading.style.display = "none";
    }
});
