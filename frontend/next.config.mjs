// Static export: `npm run build` writes plain HTML/CSS/JS to out/, so the app runs on any web server.
// BASE_PATH is set when the app is served from a sub-path, e.g. /start-group-4 on GitHub Pages.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
