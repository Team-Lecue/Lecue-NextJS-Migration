/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    VITE_APP_TOKEN: process.env.VITE_APP_TOKEN,
    VITE_KAKAO_API_KEY: process.env.VITE_KAKAO_API_KEY,
    VITE_KAKAO_BASE_URL: process.env.VITE_KAKAO_BASE_URL,
    VITE_KAKAO_REDIRECT_URI: process.env.VITE_KAKAO_REDIRECT_URI,
  },
};

export default nextConfig;
