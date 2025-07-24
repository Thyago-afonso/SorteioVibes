let participantes = [];

const btnCarregar = document.getElementById('btnCarregar');
const btnSortear = document.getElementById('btnSortear');
const lista = document.getElementById('listaParticipantes');
const ganhadorDiv = document.getElementById('ganhador');
const painelAdmin = document.getElementById("painelAdmin");
const userEmailSpan = document.getElementById("user-email");

// Detecta ambiente (localhost ou produção)
const apiBase = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://sorteio-vibes.vercel.app'; // Altere aqui se seu domínio for diferente

// 🔐 Função chamada após login com Google
async function handleCredentialResponse(response) {
  const idToken = response.credential;
  console.log('Token JWT recebido do Google:', idToken);
  try {
    const res = await fetch(`${apiBase}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ idToken })
    });

    const data = await res.json();

    if (res.ok) {
      document.querySelector('.g_id_signin').style.display = 'none';
      painelAdmin.style.display = 'block';
      userEmailSpan.textContent = data.email;
    } else {
      alert(data.message || 'Acesso negado.');
    }
  } catch (err) {
    console.error('Erro no login:', err);
    alert('Erro ao verificar token de login.');
  }
}

async function logout() {
  await fetch(`${apiBase}/api/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  window.location.reload();
}

btnCarregar.addEventListener('click', () => {
  fetch('/api/get-data') 
    .then(res => {
      if (!res.ok) {
        throw new Error('Erro na requisição da Vercel Function.');
      }
      return res.json();
    })
    .then(data => {
      participantes = data;
      lista.innerHTML = '';
      data.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} - ${p.email} - ${p.numero}`;
        lista.appendChild(li);
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar participantes:', error);
      alert("Erro ao carregar participantes.");
    });
});

// 🎯 Botão "Sortear"
btnSortear.addEventListener('click', () => {
  if (participantes.length === 0) {
    alert("Nenhum participante carregado.");
    return;
  }

  const sorteado = participantes[Math.floor(Math.random() * participantes.length)];
  ganhadorDiv.textContent = `🎉 Ganhador: ${sorteado.name} (${sorteado.email}) - Número: ${sorteado.numero}`;
});
