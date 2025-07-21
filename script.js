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
    // 🔁 SUBSTITUI AQUI: GET dos dados para verificar duplicado
    const response = await fetch('https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec');
    const dados = await response.json();

    const jaExiste = dados.some(participante => participante.numero === numero);

    if (jaExiste) {
      alert("Esse número já está cadastrado! Só é permitido participar uma vez.");
      removeLoading();
      return;
    }

    // 🔁 SUBSTITUI AQUI: POST dos dados
    await fetch('https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, numero })
    });

    alert("Cadastro realizado com sucesso!");
    form.reset();
  } catch (err) {
    alert("Erro ao enviar os dados.");
  } finally {
    removeLoading();
  }
};

form.addEventListener('submit', handleSubmit);
