const express = require('express');
const app = express();
app.use(express.json());

const usuarios = [
  {
    id: 1,
    nome: 'Ana Silva',
    email: 'ana@email.com'
  },
  {
    id: 2,
    nome: 'Bruno Souza',
    email: 'bruno@email.com'
  },
  {
    id: 3,
    nome: 'Carla Oliveira',
    email: 'carla@email.com'
  }
]


app.get('/', (req, res) => {
  res.send(`Olá mundo!`);
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const usuario = usuarios.find(u => u.id === id)

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  res.json(usuario)
})

app.post ('/usuarios',(req,res) =>{
  const nome = req.body.nome;
  const email = req.body.email;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" })
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome: nome,
    email: email
  }

  usuarios.push(novoUsuario)

  res.status(201).json(novoUsuario)
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios)
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { nome, email } = req.body

  const usuario = usuarios.find(u => u.id === id)

  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' })
  }

  usuario.nome = nome
  usuario.email = email

  res.json(usuario)
});

app.patch('/usuarios/:id', (req, res) => {
   const id = parseInt(req.params.id)
   const usuario = usuarios.find(u => u.id === id)

  if(!usuario){
    return res.status(404).json({erro:'usuario não encontrado'})
}
 if (req.body.nome) {
    usuario.nome = req.body.nome
  }

  if (req.body.email) {
    usuario.email = req.body.email
  }

  res.json(usuario)
});
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const index = usuarios.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' })
  }

  usuarios.splice(index, 1)

  res.json({ mensagem: 'Usuário removido com sucesso' })
})




app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});