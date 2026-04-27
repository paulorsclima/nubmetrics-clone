document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
  await loadVendas();
});

let paginaAtual = 1;
const itensPorPagina = 20;

async function loadVendas(pagina = 1) {
  try {
    const res = await fetch(`/api/vendas?pagina=${pagina}&limite=${itensPorPagina}`);
    const data = await res.json();

    renderTabelaVendas(data.vendas || []);
    renderPaginacao(data.total || 0, pagina);
  } catch(e) {
    console.error('Erro ao carregar vendas:', e);
  }
}

function renderTabelaVendas(vendas) {
  const tbody = document.getElementById('tabelaVendas');
  if (!tbody) return;

  if (vendas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Nenhuma venda encontrada</td></tr>';
    return;
  }

  tbody.innerHTML = vendas.map(v => `
    <tr>
      <td>${v.id || '-'}</td>
      <td>${v.comprador || '-'}</td>
      <td>${formatMoney(v.valor)}</td>
      <td>${statusBadge(v.status)}</td>
      <td>${formatDate(v.data)}</td>
      <td>${v.produto || '-'}</td>
    </tr>
  `).join('');
}

function renderPaginacao(total, paginaAtual) {
  const container = document.getElementById('paginacao');
  if (!container) return;

  const totalPaginas = Math.ceil(total / itensPorPagina);
  let html = '';

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="btn-pagina ${i === paginaAtual ? 'ativo' : ''}" 
      onclick="loadVendas(${i})">${i}</button>`;
  }

  container.innerHTML = html;
}

function filtrarVendas() {
  const status = document.getElementById('filtroStatus')?.value;
  const busca = document.getElementById('buscaVenda')?.value;
  loadVendas(1, status, busca);
}