function checkAnagram(req, res) {
  const { str1, str2 } = req.query;

  if (!str1 || !str2) {
    return res.status(400).json({ 
      error: "Parameter str1 dan str2 diperlukan",
      contoh: "?str1=listen&str2=silent"
    });
  }

  const normalize = str => 
    str.toLowerCase()
       .replace(/\s+/g, '')  
       .split('')
       .sort()
       .join('');

  const isAnagram = normalize(str1) === normalize(str2);

  res.json({
    string1: str1,
    string2: str2,
    isAnagram,
    message: isAnagram 
      ? "Kedua string merupakan anagram" 
      : "Bukan anagram"
  });
}

module.exports = { checkAnagram };