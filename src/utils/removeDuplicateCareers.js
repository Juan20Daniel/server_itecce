const removeDuplicateCareers = (duplicateCareers, isObjectArray=true) => {
    let careers = [];
    let getCareers = [];
    if(isObjectArray) getCareers = duplicateCareers.map(item => item['Sección']);
    const uniqueCareers = new Set(isObjectArray ? getCareers : duplicateCareers);
    uniqueCareers.forEach(career => careers.push(career));
    return careers;
}

module.exports = removeDuplicateCareers;