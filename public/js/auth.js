async function checkAuth() {
  const auth = localStorage.getItem('nubmetrics_auth');
  if (!auth) {
    window.location.href = '/';
    return null;
  }
  return { authenticated: true, mode: auth };
}

function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}

async function loadUserName() {
  const el = document.getElementById('userName');
  if (el) el.textContent = 'Demo';
}

function formatMoney(v) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('pt-BR');
}

function statusBadge(s) {
  const map = {
    paid: 'Pago',
    confirmed: 'Confirmado',
    payment_required: 'Aguardando',
    cancelled: 'Cancelado',
    payment_in_process: 'Em processo'
  };
  const cls = (s === 'paid' || s === 'confirmed') ? 'badge-paid' : s === 'cancelled' ? 'badge-cancelled' : 'badge-pending';
  return `<span class="badge ${cls}">${map[s] || s}</span>`;
}

function logout() {
  localStorage.removeItem('nubmetrics_auth');
  window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
});
