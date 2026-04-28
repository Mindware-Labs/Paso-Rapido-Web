import path from "path";
import { fileURLToPath } from "url";

/**
 * Raíz fija = carpeta de este archivo. Evita que Turbo resuelva `tailwindcss`
 * desde el Escritorio cuando existe otro `package.json` en un directorio padre.
 */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://backenddemo-production-8a48.up.railway.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
