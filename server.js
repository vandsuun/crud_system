const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./db');

const app = express(); // Cria a instância do Express

// Configurações de middleware
app.use(cors()); // Habilita CORS para todas as origens
app.use(bodyParser.json()); // Permite que o Express entenda JSON no corpo da requisição

// Rota GET para a raiz
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    // Aqui você pode adicionar uma validação para os dados
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    // Criptografando a senha antes de salvar no banco de dados
    bcrypt.hash(senha, 10, (err, hashedSenha) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criptografar a senha.' });
        }

        // Inserir usuário no banco de dados
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        db.query(query, [nome, email, hashedSenha], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao cadastrar o usuário no banco de dados.' });
            }
            res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});