const CLIENT_ID = process.env.ML_CLIENT_ID;
const REDIRECT_URI = process.env.ML_REDIRECT_URI;

module.exports = (req, res) => {
  const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  return res.redirect(url);
};