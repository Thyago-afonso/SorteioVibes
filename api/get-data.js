// api/get-data.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzYCcjyjwqAZfCzn6ZMFjqN-bP7YgPCmC_8NGmn50qb7ZQ69SecW7VSpdgBtGCmHNuHPA/exec';
        //so para subir pro github

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