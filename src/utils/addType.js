const addType = (array_data, type) => {
    const result = array_data.map(item => {
        return [...Object.values(item), type];
    });
    return result;
}

module.exports = {addType};