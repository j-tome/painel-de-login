import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

// Abrir o Banco de Dados
async function openDb() {
    return open({
        filename: './banco.db',
        driver: sqlite3.Database
    });
}

// Criar a tabela
(async () =>{
    const db = await openDb();
    await db.run(`
        CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        senha TEXT
        )
    `)
    console.log("✅ Tabela 'usuarios' pronta!");
})();

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
    const {nome, email, senha} = req.body;
    const db = await openDb();

    try {
    await db.run(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha]
    );
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
} catch (error) {
    console.error(error);
    res.status(400).json({
        error: 'Erro ao cadastrar o usuário. O e-mail pode já estar em uso.'
    });
}
});

// Rota de Login
app.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    const db = await openDb()

    const user  = await db.get("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha]);

    if (user) {
        res.json({ message: "Login bem-sucedido!"})
    } else {
        res.status(401).json({ error: "Usuário ou senha incorretos!"});
    }
});

app.listen(3000, () => console.log("✅ Servidor rodando em http://localhost:3000"))