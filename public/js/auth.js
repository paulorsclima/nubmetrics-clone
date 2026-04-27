async function checkAuth() {
  const res = await fetch('/auth/status');
  const data = await res.json();
  if (!data.authenticated) { window.location.href = '/'; return null; }
  return data;
}

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

async function loadUserName() {
  try {
    const res = await fetch('/api/me');
    if (res.ok) {
      const data = await res.json();
      const el = document.getElementById('userName');
      if (el) el.textContent = data.nickname || data.first_name || 'Usuário';
    }
  } catch(e) {}
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

document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadUserName();
});