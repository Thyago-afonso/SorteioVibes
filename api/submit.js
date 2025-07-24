export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzYCcjyjwqAZfCzn6ZMFjqN-bP7YgPCmC_8NGmn50qb7ZQ69SecW7VSpdgBtGCmHNuHPA/exec';

    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.text();
    res.status(200).json({ message: 'Enviado com sucesso', result });
  } catch (error) {
    console.error('Erro ao enviar:', error);
    res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
  }
}
