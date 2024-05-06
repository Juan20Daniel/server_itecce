const getAvatar = () => {
    const colorAvatars = ['#1A66AC','#AC721A','#5C7185','#323B44','#2A2889','#751B1B'];
    return colorAvatars[Math.floor(Math.random() * 6)];
}
const addTypeAndAvatar = (array_data, type) => {
    
    const result = array_data.map(item => {
        return [...Object.values(item), type, getAvatar()];
    });
    return result;
}

module.exports = {addTypeAndAvatar, getAvatar};