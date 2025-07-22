const btnCarregar = document.getElementById('btnCarregar');
const btnSortear = document.getElementById('btnSortear');
const lista = document.getElementById('listaParticipantes');
const ganhadorDiv = document.getElementById('ganhador');

// Lógica de senha (⚠️ Lembre-se que esta senha no JS não é segura para produção)
function verificarSenha() {
  const senha = document.getElementById("senha").value;
  if (senha === "123456") {
    document.getElementById("loginArea").style.display = "none";
    document.getElementById("painelAdmin").style.display = "block";
  } else {
    alert("Senha incorreta!");
  }
}

let participantes = [];

btnCarregar.addEventListener('click', () => {
  // 🔁 MUDANÇA AQUI: Carrega participantes agora via Vercel Function
  fetch('/api/get-data') // Chama sua Vercel Function
    .then(res => {
      if (!res.ok) { // Verifica se a resposta da Vercel Function foi bem-sucedida
        throw new Error('Erro na requisição da Vercel Function.');
      }
      return res.json();
    })
    .then(data => {
      participantes = data;
      lista.innerHTML = '';
      data.forEach(p => {
        const li = document.createElement('li');
        // Adicionando o número para facilitar a visualização no admin, se desejar
        li.textContent = `${p.name} - ${p.email} - ${p.numero}`;
        lista.appendChild(li);
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar participantes:', error);
      alert("Erro ao carregar participantes.");
    });
});

btnSortear.addEventListener('click', () => {
  if (participantes.length === 0) {
    alert("Nenhum participante carregado.");
    return;
  }

  const sorteado = participantes[Math.floor(Math.random() * participantes.length)];
  ganhadorDiv.textContent = `🎉 Ganhador: ${sorteado.name} (${sorteado.email}) - Número: ${sorteado.numero}`;
});