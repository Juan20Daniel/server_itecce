const transformToArrays = (array_objects) => {
    const result = array_objects.map(item => {
        return [...Object.values(item)]
    });
    return result;
}
module.exports = transformToArrays;


// const transformToArrays = (array_data, type) => {
//     const colorAvatars = ['#1A66AC','#AC721A','#5C7185','#323B44','#2A2889','#751B1B'];
//     const result = array_data.map(item => {
//         return [...Object.values(item), type, colorAvatars[Math.floor(Math.random() * 6)]]
//     });
//     return result;
// }
// module.exports = transformToArrays;