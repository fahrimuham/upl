const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Menentukan lokasi penyimpanan file yang diunggah
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const filename = uuidv4(); // Membuat nama file secara acak
    const fileExtension = path.extname(file.originalname);
    cb(null, filename + fileExtension);
  }
});

const upload = multer({ storage: storage });

// Menampilkan halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './app/index.html')); // Ubah path untuk mengakses file index.html
});

// Menangani permintaan unggah file
app.post('/upload', upload.single('file'), (req, res) => { // Perbaiki endpoint menjadi '/upload'
  const uploadedFileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.send(`File berhasil diunggah. URL: <a href="${uploadedFileUrl}">${uploadedFileUrl}</a>`);
});

// Menangani permintaan GET untuk file yang diunggah
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
