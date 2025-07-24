export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzYCcjyjwqAZfCzn6ZMFjqN-bP7YgPCmC_8NGmn50qb7ZQ69SecW7VSpdgBtGCmHNuHPA/exec';

    const formData = new URLSearchParams({
      name: req.body.name,
      email: req.body.email,
      numero: req.body.numero
    });

    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.text();
    res.status(200).json({ message: 'Dados enviados com sucesso', result });
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    res.status(500).json({ message: 'Erro ao enviar dados', error: error.message });
  }
}
