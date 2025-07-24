export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const googleScriptUrl = 'https://script.google.com/macros/s/SEU_SCRIPT_ID/exec';
      const response = await fetch(googleScriptUrl);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar dados' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
