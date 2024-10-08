const transformToArrays = (array_objects) => {
    const result = array_objects.map(item => {
        return [...Object.values(item)]
    });
    return result;
}
module.exports = transformToArrays;