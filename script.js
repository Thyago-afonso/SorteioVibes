const form = document.querySelector('form');
const button = form.querySelector('button');

const addLoading = () => {
  button.innerHTML = '<img src="loading.png" class="loading">';
};

const removeLoading = () => {
  button.innerHTML = 'Enviar';
};

const handleSubmit = async (event) => {
  event.preventDefault();
  addLoading();

  const name = document.querySelector('input[name=name]').value.trim();
  const email = document.querySelector('input[name=email]').value.trim();
  const numero = document.querySelector('input[name=numero]').value.trim();

  try {
    // 🔁 MUDANÇA AQUI: GET dos dados para verificar duplicado, agora via Vercel Function
    const response = await fetch('/api/get-data'); // Chama sua Vercel Function
    if (!response.ok) { // Verifica se a resposta da Vercel Function foi bem-sucedida
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao carregar dados para verificação.');
    }
    const dados = await response.json();

    const jaExiste = dados.some(participante => participante.numero === numero);

    if (jaExiste) {
      alert("Esse número já está cadastrado! Só é permitido participar uma vez.");
      removeLoading();
      return;
    }

    // 🔁 MUDANÇA AQUI: POST dos dados, agora via Vercel Function
    const submitResponse = await fetch('/api/submit', { // Chama sua Vercel Function
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Envia JSON para sua Vercel Function
      },
      body: JSON.stringify({ // Converte os dados para JSON
        name,
        email,
        numero
      })
    });

    if (!submitResponse.ok) { // Verifica se a resposta da Vercel Function foi bem-sucedida
      const errorData = await submitResponse.json();
      throw new Error(errorData.error || 'Erro ao enviar os dados através do proxy.');
    }

    alert("Cadastro realizado com sucesso!");
    form.reset();
  } catch (err) {
    alert("Erro ao enviar os dados: " + err.message);
  } finally {
    removeLoading();
  }
};

form.addEventListener('submit', handleSubmit);