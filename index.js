const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Menentukan lokasi penyimpanan file yang diunggah
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Menampilkan halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Menangani permintaan unggah file
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File berhasil diunggah.');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
