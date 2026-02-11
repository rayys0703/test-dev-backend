function sumEvenNumbers(req, res) {
  const arr = [15, 18, 3, 9, 6, 2, 12, 14];

  const evenNumbers = arr.filter(n => n % 2 === 0);
  const jumlah = evenNumbers.reduce((a, b) => a + b, 0);

  res.json({
    bilanganGenap: evenNumbers,
    jumlah
  });
}

module.exports = { sumEvenNumbers };