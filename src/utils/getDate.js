const actualDate = new Date();

const addZero = (value) => {
    return value < 10 ? `0${value}` : value
}
const getYear = (date) => date.getFullYear();
const getMonth = (date) => addZero(date.getMonth() + 1);
const getDay = (date) => addZero(date.getDate());

const getFullDate = () => {
    return actualDate;
}
const getCurrentDate = () => {
    return `${getYear(actualDate)}-${getMonth(actualDate)}-${getDay(actualDate)}`;
}
const normalizeDate = (data) => {
    if(!data) return null; 
    const dataDB = new Date(data);
    return `${getYear(dataDB)}-${getMonth(dataDB)}-${getDay(dataDB)}`;
}

module.exports = {getCurrentDate, getFullDate, normalizeDate };