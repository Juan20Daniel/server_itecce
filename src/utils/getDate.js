const getDate = () => {
    const actualDate = new Date();
    const year = actualDate.getFullYear();
    const month = addZero(actualDate.getMonth() + 1);
    const day = addZero(actualDate.getDate());
    const hour = addZero(actualDate.getHours());
    const minutes = addZero(actualDate.getMinutes());
    const segunts = addZero(actualDate.getSeconds());
    const fulldata = `${year}-${month}-${day} ${hour}:${minutes}:${segunts}`;
    return fulldata;
}
const addZero = (value) => {
    return value < 10 ? `0${value}` : value
}

module.exports = getDate;