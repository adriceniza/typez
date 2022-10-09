/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    TYPEZ_VERSION:process.env.TYPEZ_VERSION
  }
}


module.exports = nextConfig
