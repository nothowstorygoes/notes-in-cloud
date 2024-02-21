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
    },
    /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: "/nothowstorygoes.dev",
  assetPrefix: "/nothowstorygoes.dev/",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
});