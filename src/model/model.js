const mysql = require('mysql2/promise');

async function crearConexion() {
  try {
    const connection = await mysql.createConnection({
        host:"localhost",
        user:'root',
        password:'',
        database: 'ids'
    });

    console.log('Conexión a la base de datos establecida');

    return connection;

  } catch (error) {
    console.log('Error al conectar a la base de datos:', error);
  }
}

module.exports = crearConexion;