const expretions = {
    email:/^[a-zA-Z.-_0-9]{5,40}@[a-zA-Z]{3,30}\.[a-zA-Z]{2,5}(.[a-zA-Z]{2,5})?$/,
    period:/^[A-Z]{3}\/[0-9]{2}$/,
    imgTamplate: /^[a-zA-Z .-]{1,30}\.(jpg|JPG|jpeg|JPEG)$/,
    fullname:/^[a-zA-Z_0-9 -.]{5,30}.(XLSX|xlsx|XLS|xls)$/,
    username:/^[a-zA-ZóÓáÁéÉíÍúÚñÑ0-9 ]{5,30}$/,
    password:/^.{8,30}$/,
    abridging:/^[A-ZÁÉÍÓÚÑ() .]{10,50}$/,
    id:/^[0-9]+$/,
    type:/^[123]{1}$/,
    duration: /^[0-9]{1,2}$/
}
module.exports = {expretions}