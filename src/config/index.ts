const config = {
  apiBaseUrl: '/api/proxy',
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
