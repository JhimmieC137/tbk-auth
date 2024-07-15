export const baseConfig = () => ({
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT,
  saltRounds: process.env.SALT_ROUNDS,
  rabbit_url: process.env.RABBIT_URL,
  baseUrl: process.env.BASE_URL,
  oauth_client: process.env.GOOGLE_CLIENT_ID,
  oauth_secret: process.env.GOOGLE_SECRET,
});

//Spilit config into different files
