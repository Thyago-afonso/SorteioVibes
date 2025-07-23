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
    // Envia os dados para o Google Apps Script
    const submitResponse = await fetch("https://script.google.com/macros/s/AKfycbzYCcjyjwqAZfCzn6ZMFjqN-bP7YgPCmC_8NGmn50qb7ZQ69SecW7VSpdgBtGCmHNuHPA/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Envia como URL encoded
      },
      body: new URLSearchParams({
        name: name,
        email: email,
        numero: numero
      })
    });

    if (!submitResponse.ok) {
      const errorData = await submitResponse.json();
      throw new Error(errorData.error || 'Erro ao enviar os dados através do Google Apps Script.');
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
