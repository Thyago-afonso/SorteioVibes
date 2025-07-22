export default async function handler(req, res) {
  if (req.method === 'POST') {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec';

    try {
      // Garante que o corpo seja um objeto
      let body = req.body;
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      }

      const { name, email, numero } = body;

      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name, email, numero }).toString(),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      console.error('Erro ao chamar o Google Script:', error.message);
      return res.status(500).json({ error: 'Erro interno do servidor ao processar sua requisição.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido.' });
  }
}
