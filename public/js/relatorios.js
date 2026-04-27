document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
  await loadRelatorios();
});

async function loadRelatorios() {
  const inicio = document.getElementById('dataInicio')?.value;
  const fim = document.getElementById('dataFim')?.value;

  try {
    const res = await fetch(`/api/relatorios?inicio=${inicio || ''}&fim=${fim || ''}`);
    const data = await res.json();

    document.getElementById('totalFaturamento').textContent = formatMoney(data.totalFaturamento);
    document.getElementById('totalPedidos').textContent = data.totalPedidos || 0;
    document.getElementById('ticketMedio').textContent = formatMoney(data.ticketMedio);
    document.getElementById('totalCancelados').textContent = data.totalCancelados || 0;

    renderGraficoFaturamento(data.faturamentoPorDia || []);
    renderGraficoCategorias(data.porCategoria || []);
  } catch(e) {
    console.error('Erro ao carregar relatórios:', e);
  }
}

function renderGraficoFaturamento(dados) {
  const ctx = document.getElementById('graficoFaturamento');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dados.map(d => formatDate(d.data)),
      datasets: [{
        label: 'Faturamento (R$)',
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

function renderGraficoCategorias(dados) {
  const ctx = document.getElementById('graficoCategorias');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: dados.map(d => d.categoria),
      datasets: [{
        data: dados.map(d => d.total),
        backgroundColor: ['#00b1ea','#0077b6','#90e0ef','#caf0f8','#023e8a']
      }]
    },
    options: { responsive: true }
  });
}

function aplicarFiltro() {
  loadRelatorios();
}