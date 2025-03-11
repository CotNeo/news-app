/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'image.cnbcfm.com',
      },
      {
        protocol: 'https',
        hostname: 'g.foolcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.vaticannews.va',
      },
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
      },
      // Wildcard pattern to allow all domains - daha güvenli bir yaklaşım için spesifik domainleri listelemek daha iyidir
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
