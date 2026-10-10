// Static export: `npm run build` writes plain HTML/CSS/JS to out/, which the Docker image serves with nginx.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
