/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is the base configuration that Maizzle will use when you run commands
| like `npm run build` or `npm run serve`. Additional config files will
| inherit these settings, and can override them when necessary.
*/

/** @type {import('@maizzle/framework').Config} */
export default {
  locals: {
    // Add your own data here
    company: {
      name: "ACME Corp",
      shortName: "ACME",
      address: "123 Main St, Springfield, USA",
      phone: "+1 555 1234",
      email: "admin@acmecorp.com",
    },
  },
  server: {
    port: process.env.PORT || 3001,
    reportFileSize: true,
  },
  build: {
    content: ["src/templates/**/*.html"],
    // Uncomment if you want to copy images to the build folder
    // static: {
    //   source: ["src/images/**/*.*"],
    //   destination: "images",
    // },
  },
  css: {},
};
