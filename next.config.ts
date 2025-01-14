const config = {
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://cinemotto.com'
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'cinemotto.com']
    }
  }
};

export default config;
