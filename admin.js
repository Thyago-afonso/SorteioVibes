let participantes = [];

const btnCarregar = document.getElementById('btnCarregar');
const btnSortear = document.getElementById('btnSortear');
const lista = document.getElementById('listaParticipantes');
const ganhadorDiv = document.getElementById('ganhador');
const painelAdmin = document.getElementById("painelAdmin");
const userEmailSpan = document.getElementById("user-email");

// Verifica token salvo ao abrir a página
window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('idToken');
  const email = localStorage.getItem('email');

  if (token) {
    try {
      const res = await fetch('/api/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token })
      });

      const data = await res.json();

      if (res.ok) {
        document.querySelector('.g_id_signin').style.display = 'none';
        painelAdmin.style.display = 'block';
        userEmailSpan.textContent = data.email;
      } else {
        console.warn('Token inválido ou acesso negado');
        localStorage.clear();
      }
    } catch (err) {
      console.error('Erro ao verificar token salvo:', err);
      localStorage.clear();
    }
  }
});


// Detecta ambiente (localhost ou produção)
const apiBase = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://sorteio-vibes.vercel.app'; // Altere aqui se seu domínio for diferente

async function handleCredentialResponse(response) {
  const idToken = response.credential;
  console.log('🪪 Token JWT recebido do Google:', idToken);

  try {
    const res = await fetch('/api/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });

    const data = await res.json();

    if (res.ok) {
      // Armazena token e email
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('email', data.email);

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

function logout() {
  localStorage.clear();
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
