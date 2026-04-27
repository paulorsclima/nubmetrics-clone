document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
  await loadDashboardData();
});

async function loadDashboardData() {
  try {
    const res = await fetch('/api/dashboard');
    const data = await res.json();

    document.getElementById('totalVendas').textContent = formatMoney(data.totalVendas);
    document.getElementById('totalPedidos').textContent = data.totalPedidos || 0;
    document.getElementById('ticketMedio').textContent = formatMoney(data.ticketMedio);
    document.getElementById('totalVisitas').textContent = data.totalVisitas || 0;

    renderGraficoVendas(data.vendasPorDia || []);
    renderGraficoProdutos(data.topProdutos || []);
  } catch(e) {
    console.error('Erro ao carregar dashboard:', e);
  }
}

function renderGraficoVendas(dados) {
  const ctx = document.getElementById('graficoVendas');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dados.map(d => formatDate(d.data)),
      datasets: [{
        label: 'Vendas (R$)',
        data: dados.map(d => d.total),
        borderColor: '#00b1ea',
        backgroundColor: 'rgba(0,177,234,0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

function renderGraficoProdutos(dados) {
  const ctx = document.getElementById('graficoProdutos');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dados.map(d => d.nome),
      datasets: [{
        label: 'Unidades vendidas',
        data: dados.map(d => d.quantidade),
        backgroundColor: '#00b1ea'
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}