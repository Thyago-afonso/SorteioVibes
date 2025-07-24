export default async function handler(req, res) {
  // Permite apenas requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // URL do seu Google Apps Script
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzYCcjyjwqAZfCzn6ZMFjqN-bP7YgPCmC_8NGmn50qb7ZQ69SecW7VSpdgBtGCmHNuHPA/exec';

    // Envia os dados recebidos para o Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // repassa os dados exatamente como vieram
    });

    const result = await response.text(); // pode usar .json() se seu script responder com JSON

    // Retorna sucesso para o front-end
    res.status(200).json({ message: 'Dados enviados com sucesso', result });
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
  }
}
