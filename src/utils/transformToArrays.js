const transformToArrays = (array_objects) => {
    if(!array_objects.length) return [];
    const result = array_objects.map(item => {
        return [...Object.values(item)]
    });
    return result;
}
module.exports = transformToArrays;