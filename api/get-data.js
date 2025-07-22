// api/get-data.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec';

    try {
      const response = await fetch(googleScriptUrl);
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      console.error('Erro ao carregar dados do Google Script:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao carregar dados.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido.' });
  }
}