document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
  await loadAnuncios();
});

async function loadAnuncios(pagina = 1) {
  try {
    const res = await fetch(`/api/anuncios?pagina=${pagina}&limite=20`);
    const data = await res.json();

    renderCards(data.anuncios || []);
    renderPaginacaoAnuncios(data.total || 0, pagina);
  } catch(e) {
    console.error('Erro ao carregar anúncios:', e);
  }
}

function renderCards(anuncios) {
  const container = document.getElementById('listaAnuncios');
  if (!container) return;

  if (anuncios.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhum anúncio encontrado.</p>';
    return;
  }

  container.innerHTML = anuncios.map(a => `
    <div class="card-anuncio">
      <img src="${a.thumbnail || ''}" alt="${a.titulo}" />
      <div class="card-info">
        <h4>${a.titulo || '-'}</h4>
        <p>${formatMoney(a.preco)}</p>
        <span class="badge ${a.status === 'active' ? 'badge-paid' : 'badge-cancelled'}">
          ${a.status === 'active' ? 'Ativo' : 'Pausado'}
        </span>
        <p class="visitas">👁 ${a.visitas || 0} visitas</p>
      </div>
    </div>
  `).join('');
}

function renderPaginacaoAnuncios(total, paginaAtual) {
  const container = document.getElementById('paginacaoAnuncios');
  if (!container) return;

  const totalPaginas = Math.ceil(total / 20);
  let html = '';

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="btn-pagina ${i === paginaAtual ? 'ativo' : ''}" 
      onclick="loadAnuncios(${i})">${i}</button>`;
  }

  container.innerHTML = html;
}

function filtrarAnuncios() {
  const status = document.getElementById('filtroStatusAnuncio')?.value;
  loadAnuncios(1, status);
}