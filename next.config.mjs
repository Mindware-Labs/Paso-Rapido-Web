import path from "path";
import { fileURLToPath } from "url";

/**
 * Raíz fija = carpeta de este archivo. Evita que Turbo resuelva `tailwindcss`
 * desde el Escritorio cuando existe otro `package.json` en un directorio padre.
 */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
