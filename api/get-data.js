export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec';
    
    const response = await fetch(googleScriptUrl);
    const data = await response.json(); // Certifique-se que o Apps Script responde JSON

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return res.status(500).json({ message: "Erro ao buscar dados", erro: error.message });
  }
}