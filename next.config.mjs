// next.config.mjs

const nextConfig = {
    /* Add your Next.js configuration here */
    pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  
    webpack: (config, { dev, isServer }) => {
      // Modify webpack config here
      return config;
    },
  
    env: {
      CUSTOM_VARIABLE: 'value',
    },
  
    images: {
      domains: ['example.com'],
    },
  
    async headers() {
      return [
        {
          source: '/login/page',
          headers: [
            {
              key: 'X-Custom-Header',
              value: 'hello world',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig; // Note: Use "export default" instead of "module.exports"
  