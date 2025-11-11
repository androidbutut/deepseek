# Three.js AI Assistant

Frontend aplikasi chat AI yang khusus designed untuk membantu development Three.js dan proyek 3D web. Dengan antarmuka dark mode yang modern mirip GitHub Copilot, dilengkapi berbagai tools dan fitur khusus untuk 3D development.

✨ Fitur Utama

🤖 AI Assistant Cerdas

· Chat Contextual: Diskusi tentang Three.js, WebGL, shaders, dan 3D development
· Multi-context Support: Pilih konteks (Three.js, WebGL, Blender, Shaders)
· Code Generation: Generate kode Three.js otomatis berdasarkan prompt
· Code Optimization: Optimasi kode existing untuk performa lebih baik
· Performance Analysis: Analisis dan rekomendasi optimasi performa

🛠️ Tools Development

· 3D Preview: Preview langsung model 3D di browser
· File Upload: Upload file 3D (GLTF, GLB, OBJ, FBX) untuk analisis
· Quick Actions: Template prompt cepat untuk tugas umum
· Context Switching: Beralih antara berbagai konteks development

🎨 UI/UX Modern

· Dark Theme: Tema dark soft yang nyaman di mata
· Copilot-like Interface: Desain familiar mirip GitHub Copilot
· Responsive Design: Optimal di desktop dan mobile
· Real-time Typing Indicator: Indikator typing animasi

🚀 Instalasi dan Menjalankan

Prerequisites

· Backend Worker Cloudflare sudah ter-deploy
· Browser modern dengan support WebGL
· Server local untuk development

Langkah Setup

1. Clone atau download project

```bash
git clone <repository-url>
cd three-ai-frontend
```

1. Konfigurasi Backend URL
   Edit filescripts/app.js dan ubah backendUrl:

```javascript
this.backendUrl = 'https://your-worker.your-account.workers.dev';
```

1. Jalankan Local Server

```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan Node.js serve
npx serve .

# Menggunakan PHP
php -S localhost:8000
```

1. Buka di Browser

```
http://localhost:8000
```

📁 Struktur Project

```
three-ai-frontend/
├── index.html                 # Main HTML file
├── styles/
│   └── main.css              # All CSS styles
├── scripts/
│   ├── app.js               # Main application logic
│   ├── chat.js              # Chat functionality
│   └── three-preview.js     # Three.js preview component
└── assets/
    └── icons/               # Icon assets (jika ada)
```

🎯 Cara Penggunaan

1. Chat Dasar

· Ketik pertanyaan di textarea input
· Tekan Enter atau klik tombol send
· AI akan merespons dengan penjelasan dan code examples

2. Generate Kode

· Klik tombol "Generate Code"
· Atau ketik prompt seperti: "Buatkan rotating cube dengan texture"
· Dapatkan kode Three.js siap pakai

3. Optimasi Kode

· Klik tombol "Optimize" setelah generate kode
· AI akan memberikan versi optimized dengan penjelasan

4. Upload File 3D

· Klik tombol "Upload 3D"
· Drag & drop file atau browse file
· Pilih jenis analisis (performance, compatibility, optimization)

5. Preview 3D

· Klik tombol "Preview 3D" di header
· Lihat preview model 3D langsung di browser
· Kontrol rotation dan reset view

6. Quick Actions

· Gunakan template cepat di welcome screen
· Topik: Basic Scene, Performance Tips, GLTF Loading, Shader Help

🎮 Kontrol dan Shortcuts

Keyboard Shortcuts

· Enter: Kirim pesan
· Shift + Enter: Baris baru di textarea
· Ctrl + /: Fokus ke input (soon)

Tombol Aksi

· 📁 Upload 3D: Upload dan analisis file 3D
· </> Generate Code: Generate kode Three.js
· ⚡ Optimize: Optimasi kode existing
· 📊 Analyze: Analisis performa
· 🧊 Preview 3D: Buka preview 3D model

🔧 Konfigurasi

Context Selection

Pilih konteks yang sesuai dengan kebutuhan:

· Three.js: Umum Three.js development
· WebGL: WebGL native dan advanced topics
· Blender: 3D modeling dan export tips
· Shaders: Custom shaders dan GLSL

File Support

Format file 3D yang didukung:

· ✅ GLTF (.gltf)
· ✅ GLB (.glb)
· ✅ OBJ (.obj)
· ✅ FBX (.fbx)
· ✅ STL (.stl)
· ✅ PLY (.ply)

Analysis Types

Jenis analisis untuk file 3D:

· Performance: Optimasi performa rendering
· Compatibility: Kompatibilitas Three.js
· Optimization: Saran optimasi model

🛠️ Development

Menambah Fitur Baru

1. Tambahkan tombol baru di input-actions:

```html
<button class="action-btn" id="newFeatureBtn">
    <i class="fas fa-icon"></i>
</button>
```

1. Register event listener di app.js:

```javascript
document.getElementById('newFeatureBtn').addEventListener('click', () => this.newFeature());
```

1. Implement method functionality:

```javascript
newFeature() {
    // Implementasi fitur baru
}
```

Custom Styling

Warna utama bisa diubah di :root variables:

```css
:root {
    --accent-blue: #your-color;
    --bg-primary: #your-background;
    /* ... */
}
```

🌐 API Integration

Frontend ini berkomunikasi dengan backend melalui endpoints:

Endpoint Method Description
/api/chat POST Chat dengan AI
/api/generate-code POST Generate kode Three.js
/api/optimize POST Optimasi kode
/api/analyze-3d POST Analisis file 3D
/api/files POST Upload file

📱 Responsive Design

Aplikasi mendukung berbagai ukuran layar:

· Desktop: 1200px+ (full features)
· Tablet: 768px - 1199px (optimized layout)
· Mobile: < 768px (mobile-friendly)

🐛 Troubleshooting

Common Issues

1. Backend Connection Error
   · Pastikan URL backend benar
   · Check CORS configuration di backend
   · Verify worker status
2. 3D Preview Tidak Muncul
   · Pastikan browser support WebGL
   · Check console untuk error messages
   · Refresh halaman
3. File Upload Gagal
   · Pastikan format file didukung
   · Check ukuran file (max 5MB)
   · Verify network connection

Browser Support

· ✅ Chrome 90+
· ✅ Firefox 88+
· ✅ Safari 14+
· ✅ Edge 90+

📄 License

MIT License - bebas digunakan untuk project personal dan komersial.

🤝 Contributing

Untuk kontribusi:

1. Fork project
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

📞 Support

Jika mengalami masalah:

1. Check troubleshooting section
2. Buka issue di repository
3. Contact developer

---

Happy 3D Coding! 🚀

Dibuat dengan ❤️ untuk komunitas Three.js Indonesia
