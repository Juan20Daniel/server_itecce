const xlsx = require('xlsx');

const readFile = (file) => {
    const workbook = xlsx.read(file);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
}

module.exports = readFile;