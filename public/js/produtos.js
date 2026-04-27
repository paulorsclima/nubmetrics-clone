document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
  await loadProdutos();
});

async function loadProdutos(pagina = 1) {
  try {
    const res = await fetch(`/api/produtos?pagina=${pagina}&limite=20`);
    const data = await res.json();

    renderTabelaProdutos(data.produtos || []);
    renderPaginacaoProdutos(data.total || 0, pagina);
  } catch(e) {
    console.error('Erro ao carregar produtos:', e);
  }
}

function renderTabelaProdutos(produtos) {
  const tbody = document.getElementById('tabelaProdutos');
  if (!tbody) return;

  if (produtos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum produto encontrado</td></tr>';
    return;
  }

  tbody.innerHTML = produtos.map(p => `
    <tr>
      <td><img src="${p.thumbnail || ''}" alt="${p.titulo}" width="50" style="border-radius:6px"></td>
      <td>${p.titulo || '-'}</td>
      <td>${formatMoney(p.preco)}</td>
      <td>${p.estoque ?? '-'}</td>
      <td><span class="badge ${p.ativo ? 'badge-paid' : 'badge-cancelled'}">
        ${p.ativo ? 'Ativo' : 'Inativo'}
      </span></td>
    </tr>
  `).join('');
}

function renderPaginacaoProdutos(total, paginaAtual) {
  const container = document.getElementById('paginacaoProdutos');
  if (!container) return;

  const totalPaginas = Math.ceil(total / 20);
  let html = '';

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="btn-pagina ${i === paginaAtual ? 'ativo' : ''}" 
      onclick="loadProdutos(${i})">${i}</button>`;
  }

  container.innerHTML = html;
}

function filtrarProdutos() {
  const busca = document.getElementById('buscaProduto')?.value;
  loadProdutos(1, busca);
}