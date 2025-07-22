// api/submit.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const googleScriptUrl =
      'https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec';

    try {
      let body = req.body;
      if (typeof body === 'string') {
        console.log('🔍 Body recebido como string. Fazendo JSON.parse...');
        body = JSON.parse(body);
      }

      const { name, email, numero } = body;
      console.log('📦 Dados recebidos no submit.js:', { name, email, numero });

      const payload = new URLSearchParams({ name, email, numero }).toString();

      console.log('➡️ Enviando dados para Google Script...');
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      });

      const text = await response.text();
      console.log('✅ Resposta do Google Script:', text);

      return res.status(200).json({ message: 'Dados enviados com sucesso.' });
    } catch (error) {
      console.error('❌ Erro ao processar o submit.js:', error);
      return res.status(500).json({ error: 'Erro interno do servidor ao processar sua requisição.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido.' });
  }
}
