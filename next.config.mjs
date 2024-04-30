/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   hostname: "serpapi.com",
      // },
      // {
      //   hostname: "lh5.googleusercontent.com",
      // },
      // {
      //   hostname: "images.unsplash.com",
      // },
      // {
      //   hostname: "screen-api.vizeater.co",
      // },
      // {
      //   hostname: "resizer.otstatic.com",
      // },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
