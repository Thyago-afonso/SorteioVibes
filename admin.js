const btnCarregar = document.getElementById('btnCarregar');
const btnSortear = document.getElementById('btnSortear');
const lista = document.getElementById('listaParticipantes');
const ganhadorDiv = document.getElementById('ganhador');

// Lógica de senha
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
    fetch('https://script.google.com/macros/s/AKfycbwQc2D0oSXcuwMkpmAhh63ErIUCgZhkths2swb148VCtiYhLZ5c4Q-wLCG0E3oGgm0hCw/exec')
        .then(res => res.json())
        .then(data => {
            participantes = data;
            lista.innerHTML = '';
            data.forEach(p => {
                const li = document.createElement('li');
                li.textContent = `${p.name} - ${p.email}`;
                lista.appendChild(li);
            });
        })
        .catch(() => alert("Erro ao carregar participantes."));
});

btnSortear.addEventListener('click', () => {
    if (participantes.length === 0) {
        alert("Nenhum participante carregado.");
        return;
    }

    const sorteado = participantes[Math.floor(Math.random() * participantes.length)];
    ganhadorDiv.textContent = `🎉 Ganhador: ${sorteado.name} (${sorteado.email})`;
});
