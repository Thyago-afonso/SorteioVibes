console.log(req.body);


const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');
const cors = require('cors');

const CLIENT_ID = '981725293339-ekqct59vomked91n5ba9mpjetdm5ojud.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const authorizedEmails = [
  'thyago.afonso@aluno.unievangelica.edu.br',
  'marciolimakamikaze@gmail.com',
  'thyago.barbosa.2006@gmail.com'
];

const app = express();
app.use(cors({
origin: ['http://localhost:5500', 'https://sorteio-vibes.vercel.app'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'sua-chave-secreta',
  resave: false,
  saveUninitialized: false,
}));

app.post('/api/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    if (!authorizedEmails.includes(email)) {
      return res.status(403).json({ message: 'E-mail não autorizado.' });
    }

    req.session.user = { email };
    res.json({ message: 'Login OK', email });
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.get('/api/admin-data', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
  res.json({ message: 'Painel admin autorizado!', user: req.session.user });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout OK' });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
