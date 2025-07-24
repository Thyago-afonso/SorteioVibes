import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '981725293339-ekqct59vomked91n5ba9mpjetdm5ojud.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const authorizedEmails = [
  'thyago.afonso@aluno.unievangelica.edu.br',
  'marciolimakamikaze@gmail.com',
  'thyago.barbosa.2006@gmail.com'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    if (!authorizedEmails.includes(email)) {
      return res.status(403).json({ message: 'E-mail não autorizado' });
    }

    return res.status(200).json({ message: 'Token válido', email });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
}
