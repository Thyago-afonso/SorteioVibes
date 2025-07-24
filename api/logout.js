export default function handler(req, res) {
  // Como não há sessão na Vercel, só retorna ok
  return res.status(200).json({ message: 'Logout OK' });
}
