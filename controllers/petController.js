const { pets } = require('../data/pets');

function addRino(req, res) {
  const newPet = {
    jenis: "Badak",
    ras: "Badak Jawa",
    nama: "Rino",
    karakteristik: "Pekerja keras",
    favorite: true
  };

  pets.push(newPet);
  res.json({ message: "Rino berhasil ditambahkan", data: pets });
}

function getFavorites(req, res) {
  const { order = 'asc' } = req.query;

  let favorites = pets.filter(p => p.favorite);

  favorites.sort((a, b) => {
    if (order === "desc") return b.nama.localeCompare(a.nama);
    return a.nama.localeCompare(b.nama);
  });

  res.json(favorites);
}

function changePersiaToMaineCoon(req, res) {
  const updated = pets.map(p => {
    if (p.jenis === "Kucing" && p.ras === "Persia") {
      return { ...p, ras: "Maine Coon" };
    }
    return p;
  });

  pets.splice(0, pets.length, ...updated);

  res.json({ message: "Persia diganti menjadi Maine Coon", data: pets });
}

function countByJenis(req, res) {
  const result = {};

  pets.forEach(p => {
    result[p.jenis] = (result[p.jenis] || 0) + 1;
  });

  res.json(result);
}

function getPalindromes(req, res) {
  const isPalindrome = str => {
    const lower = str.toLowerCase();
    return lower === lower.split("").reverse().join("");
  };

  const result = pets
    .filter(p => isPalindrome(p.nama))
    .map(p => ({
      nama: p.nama,
      panjang: p.nama.length
    }));

  res.json(result);
}

module.exports = {
  addRino,
  getFavorites,
  changePersiaToMaineCoon,
  countByJenis,
  getPalindromes
};