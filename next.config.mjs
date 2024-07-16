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
    APP_TOKEN: process.env.APP_TOKEN,
    KAKAO_API_KEY: process.env.KAKAO_API_KEY,
    KAKAO_BASE_URL: process.env.KAKAO_BASE_URL,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
  },
};

export default nextConfig;
