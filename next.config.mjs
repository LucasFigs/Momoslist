/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // IMPORTANTE: o padrão do Next é 1MB. Como aceitamos imagens de até 5MB,
      // sem isso qualquer foto de celular estoura o limite e o upload falha.
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
