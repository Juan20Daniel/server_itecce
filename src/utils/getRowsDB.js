const getRowsDB = (fields) => {
    const rows = fields.map(field => [field, field]);
    return rows;
}

module.exports = getRowsDB;