import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required to suppress conflict warning when next-pwa injects webpack config
  // while Next.js 16 uses Turbopack by default in dev
  turbopack: {},
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
