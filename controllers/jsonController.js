const fs = require('fs');

function formatCaseJson(req, res) {
  const raw = JSON.parse(fs.readFileSync("assets/json/case.json", 'utf8'));
  const data = raw.data;

  // Update menambahkan sort parameter
  const sortParam = (req.query.sort || 'asc').toLowerCase();
  const isDesc = sortParam === 'desc';

  let grandTotal = 0;
  const grouped = {};

  data.forEach(item => {
    grandTotal += item.total;

    if (!grouped[item.category]) {
      grouped[item.category] = { total: 0, data: {} };
    }

    grouped[item.category].total += item.total;

    if (!grouped[item.category].data[item.code]) {
      grouped[item.category].data[item.code] = { total: 0, data: [] };
    }

    grouped[item.category].data[item.code].total += item.total;
    grouped[item.category].data[item.code].data.push({
      name: item.name,
      total: item.total
    });
  });

  const result = {
    total: grandTotal,
    data: Object.keys(grouped)
      .map(category => {
        const codeObj = grouped[category].data;

        Object.keys(codeObj).forEach(code => {
          codeObj[code].data.sort((a, b) => {
            return isDesc 
              ? b.total - a.total          // desc: besar ke kecil
              : a.total - b.total;         // asc: kecil ke besar
          });
        });

        const sortedCodes = Object.keys(codeObj).sort();
        const sortedData = {};
        sortedCodes.forEach(code => {
          sortedData[code] = codeObj[code];
        });

        return {
          category,
          total: grouped[category].total,
          data: sortedData
        };
      })
  };

  res.json(result);
}

module.exports = { formatCaseJson };