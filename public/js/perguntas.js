document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
  await loadPerguntas();
});

async function loadPerguntas(pagina = 1) {
  try {
    const res = await fetch(`/api/perguntas?pagina=${pagina}&limite=20`);
    const data = await res.json();

    renderPerguntas(data.perguntas || []);
    renderPaginacaoPerguntas(data.total || 0, pagina);
  } catch(e) {
    console.error('Erro ao carregar perguntas:', e);
  }
}

function renderPerguntas(perguntas) {
  const container = document.getElementById('listaPerguntas');
  if (!container) return;

  if (perguntas.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhuma pergunta encontrada.</p>';
    return;
  }

  container.innerHTML = perguntas.map(p => `
    <div class="card-pergunta">
      <div class="pergunta-header">
        <span class="badge ${p.respondida ? 'badge-paid' : 'badge-pending'}">
          ${p.respondida ? 'Respondida' : 'Pendente'}
        </span>
        <small>${formatDate(p.data)}</small>
      </div>
      <p class="pergunta-texto"><strong>Comprador:</strong> ${p.comprador || '-'}</p>
      <p class="pergunta-texto">❓ ${p.texto || '-'}</p>
      ${p.respondida ? `<p class="resposta-texto">✅ ${p.resposta}</p>` : `
        <div class="resposta-form">
          <textarea id="resposta-${p.id}" placeholder="Digite sua resposta..."></textarea>
          <button onclick="responder('${p.id}')">Responder</button>
        </div>
      `}
    </div>
  `).join('');
}

async function responder(id) {
  const texto = document.getElementById(`resposta-${id}`)?.value;
  if (!texto) return alert('Digite uma resposta!');

  try {
    const res = await fetch(`/api/perguntas/${id}/responder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resposta: texto })
    });

    if (res.ok) {
      alert('Resposta enviada!');
      await loadPerguntas();
    } else {
      alert('Erro ao enviar resposta.');
    }
  } catch(e) {
    console.error('Erro:', e);
  }
}

function renderPaginacaoPerguntas(total, paginaAtual) {
  const container = document.getElementById('paginacaoPerguntas');
  if (!container) return;

  const totalPaginas = Math.ceil(total / 20);
  let html = '';

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="btn-pagina ${i === paginaAtual ? 'ativo' : ''}" 
      onclick="loadPerguntas(${i})">${i}</button>`;
  }

  container.innerHTML = html;
}