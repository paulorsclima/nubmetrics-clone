const express = require('express');
const axios = require('axios');
const router = express.Router();

const ML_BASE = 'https://api.mercadolibre.com';

function authMiddleware(req, res, next) {
  if (!req.session.token) return res.status(401).json({ error: 'Não autenticado' });
  next();
}

function mlHeaders(req) {
  return { headers: { Authorization: `Bearer ${req.session.token}` } };
}

// Dados do usuário logado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(`${ML_BASE}/users/me`, mlHeaders(req));
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Reputação do vendedor
router.get('/sales/summary', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(`${ML_BASE}/users/${req.session.user_id}/seller_reputation`, mlHeaders(req));
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Pedidos recentes
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(
      `${ML_BASE}/orders/search?seller=${req.session.user_id}&sort=date_desc&limit=50`,
      mlHeaders(req)
    );
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Anúncios ativos
router.get('/listings', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(
      `${ML_BASE}/users/${req.session.user_id}/items/search?status=active&limit=50`,
      mlHeaders(req)
    );
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Detalhes de um anúncio
router.get('/listing/:id', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(`${ML_BASE}/items/${req.params.id}`, mlHeaders(req));
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Busca pública de produtos
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { q, category, limit = 20 } = req.query;
    let url = `${ML_BASE}/sites/MLB/search?limit=${limit}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;
    if (category) url += `&category=${category}`;
    const { data } = await axios.get(url, mlHeaders(req));
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Tendências do ML Brasil
router.get('/trends', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(`${ML_BASE}/trends/MLB`, mlHeaders(req));
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Visitas em um anúncio (últimos 30 dias)
router.get('/visits/:itemId', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(
      `${ML_BASE}/items/${req.params.itemId}/visits/time_window?last=30&unit=day`,
      mlHeaders(req)
    );
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Análise de concorrentes por produto
router.get('/competitors', authMiddleware, async (req, res) => {
  try {
    const { q, limit = 15 } = req.query;
    const { data } = await axios.get(
      `${ML_BASE}/sites/MLB/search?q=${encodeURIComponent(q)}&limit=${limit}&sort=sold_quantity_desc`,
      mlHeaders(req)
    );
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Perguntas não respondidas
router.get('/questions', authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get(
      `${ML_BASE}/questions/search?seller_id=${req.session.user_id}&status=UNANSWERED`,
      mlHeaders(req)
    );
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;