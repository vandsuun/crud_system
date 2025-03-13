const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Vandsuun', // Seu usuário do MySQL
    password: 'Residentevil7', // Sua senha do MySQL
    database: 'sistema_usuarios'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

module.exports = connection;
