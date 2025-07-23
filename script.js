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
    const response = await fetch('/api/get-data'); // GET via Vercel Function
    if (!response.ok) {
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

    const submitResponse = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, numero })
    });

    if (!submitResponse.ok) {
      const errorData = await submitResponse.json();
      throw new Error(errorData.error || 'Erro ao enviar os dados.');
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
