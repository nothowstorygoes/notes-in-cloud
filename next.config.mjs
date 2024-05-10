
//Next.js's configs for export, using a module that handles the offline aspects of the app.

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
    fallbacks: {
    document: "/~offline",
    image:"/fallback.png"
  },
  register:true,
});
      
export default withPWA({

    webpack: (config) => {
      config.resolve.alias.canvas = false;
   
      return config;
    },

  // added a basepath and assetPrefix since the app is hosted on personal Github Pages with other projects.
  output: "export",
  basePath: "/notes-in-cloud",
  assetPrefix: "/notes-in-cloud/",
  images: {
    unoptimized: true,
  },

});