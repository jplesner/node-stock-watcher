const fs = require('fs');

const dataFilePath = './data.json';

function data() {
  function getData(key) {
    const rawData = fs.readFileSync(dataFilePath);
    let record = JSON.parse(rawData);
    return record[key];
  }

  function setData(key, value) {
    const rawData = fs.readFileSync(dataFilePath);
    let record = JSON.parse(rawData);
    record[key] = value;
    fs.writeFileSync(dataFilePath, JSON.stringify(record));
  }
  return { getData, setData };
}

module.exports = data();