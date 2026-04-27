const axios = require('axios');
const qs = require('querystring');

const CLIENT_ID = process.env.ML_CLIENT_ID;
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET;
const REDIRECT_URI = process.env.ML_REDIRECT_URI;

module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Código não encontrado');
  }

  try {
    const response = await axios.post(
      'https://api.mercadolibre.com/oauth/token',
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    const { access_token, refresh_token, user_id, expires_in } = response.data;

    return res.status(200).json({
      success: true,
      access_token,
      refresh_token,
      user_id,
      expires_in
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).send('Erro ao autenticar no Mercado Livre');
  }
};