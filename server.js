const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const usuarios = [];

app.get('/', (req, res) => {
  res.send('API de Autenticação rodando com sucesso!');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const usuarioExiste = usuarios.find(u => u.email === email);
  if (usuarioExiste) {
    return res.status(409).json({ message: 'E-mail já cadastrado.' });
  }

  const novoUsuario = { id: usuarios.length + 1, email, password };
  usuarios.push(novoUsuario);

  return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: { id: novoUsuario.id, email: novoUsuario.email } });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  return res.status(200).json({ message: 'Login realizado com sucesso!', user: { id: usuario.id, email: usuario.email } });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});