import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register:true,
  cacheOnFrontEndNav:true,
  fallbacks:
  {
    document: "/~offline",
    image: "fallback.webp",
  }
});

export default withPWA({
    webpack: (config) => {
      config.resolve.alias.canvas = false;
   
      return config;
    }
});