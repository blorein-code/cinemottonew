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
    serverActions: true
  }
};

export default config;
