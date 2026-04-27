const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.ML_CLIENT_ID;
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
const REDIRECT_URI = process.env.ML_REDIRECT_URI;

// Inicia login OAuth2
router.get('/login', (req, res) => {
  const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(url);
});

// Callback após login
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI
    });
    req.session.token = response.data.access_token;
    req.session.refresh_token = response.data.refresh_token;
    req.session.user_id = response.data.user_id;
    res.redirect('/pages/dashboard.html');
  } catch (err) {
    res.status(500).json({ error: 'Erro na autenticação', details: err.message });
  }
});

// Renovar token automaticamente
router.get('/refresh', async (req, res) => {
  try {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: req.session.refresh_token
    });
    req.session.token = response.data.access_token;
    req.session.refresh_token = response.data.refresh_token;
    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: 'Token expirado, faça login novamente' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Verifica se está autenticado
router.get('/status', (req, res) => {
  res.json({
    authenticated: !!req.session.token,
    user_id: req.session.user_id || null
  });
});

module.exports = router;