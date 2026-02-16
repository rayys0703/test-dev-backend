const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const { pets } = require('./data/pets');
const petCtrl      = require('./controllers/petController');
const numCtrl      = require('./controllers/numberController');
const jsonCtrl     = require('./controllers/jsonController');
const anagramCtrl  = require('./controllers/anagramController');

// route: ?show=1 sampai ?show=9
app.get('/', (req, res) => {
  const { show } = req.query;

  const options = {
    "1": () => res.json({ 
      message: "Data hewan peliharaan Esa",
      data: pets 
    }),

    "2": () => res.json({ 
      message: "Fungsi ini untuk menambah hewan Rino (Badak Jawa)",
      cara: "Gunakan POST ke /pets/add-rino",
      endpoint: "POST http://localhost:3000/pets/add-rino"
    }),

    "3": () => petCtrl.getFavorites(req, res),
    "4": () => petCtrl.changePersiaToMaineCoon(req, res),
    "5": () => petCtrl.countByJenis(req, res),
    "6": () => petCtrl.getPalindromes(req, res),
    "7": () => numCtrl.sumEvenNumbers(req, res),
    "8": () => anagramCtrl.checkAnagram(req, res),
    "9": () => jsonCtrl.formatCaseJson(req, res),
  };

  if (show && options[show]) {
    return options[show]();
  }

  res.json({
    message: "Selamat datang di API Hewan Peliharaan Esa!",
    instruksi: "Gunakan parameter ?show=1 sampai ?show=9 (Sesuai daftar)",
    daftar: [
      "1  → Tampilkan data array hewan peliharaan Esa yang merepresentasikan jenis, ras, nama dan karakteristik",
      "2  → Fungsi menambah hewan peliharaan baru Esa (Rino, Badak Jawa)",
      "3  → Mengambil hewan kesayangan Esa (bisa ?order=asc atau desc, sesuai nama hewan)",
      "4  → Ganti kucing Persia menjadi Maine Coon",
      "5  → Hitung jumlah hewan per jenis",
      "6  → Nama hewan yang palindrome + panjangnya",
      "7  → Jumlah bilangan genap dari [15,18,3,9,6,2,12,14]",
      "8  → Cek anagram (?str1=...&str2=...)",
      "9  → Format JSON case.json menjadi seperti expectation.json (Gunakan ?sort=asc atau desc untuk mengurutkan item di dalam code)"
    ]
  });
});

app.post('/pets/add-rino',        petCtrl.addRino);
app.put('/pets/change-persia',    petCtrl.changePersiaToMaineCoon);
app.get('/pets/favorites',        petCtrl.getFavorites);
app.get('/pets/count-by-jenis',   petCtrl.countByJenis);
app.get('/pets/palindrome',       petCtrl.getPalindromes);
app.get('/numbers/even',          numCtrl.sumEvenNumbers);
app.get('/format-json',           jsonCtrl.formatCaseJson);
app.get('/anagram', anagramCtrl.checkAnagram);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});