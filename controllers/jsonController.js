const fs = require('fs');

function formatCaseJson(req, res) {
  const raw = JSON.parse(fs.readFileSync("assets/json/case.json", 'utf8'));
  const data = raw.data;

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
        const sortedCodes = Object.keys(grouped[category].data).sort();
        const sortedData = {};
        sortedCodes.forEach(code => {
          sortedData[code] = grouped[category].data[code];
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