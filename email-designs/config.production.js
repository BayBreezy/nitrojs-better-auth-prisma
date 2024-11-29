/*
|-------------------------------------------------------------------------------
| Production config                       https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is the production configuration that Maizzle will use when you run the
| `npm run build` command. These settings will be merged on top of the base
| `config.js`, so you only need to add the options that are changing.
|
*/

/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    output: {
      path: "../emails",
    },
  },
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  widowWords: undefined,
  minify: true,
  prettify: true,
};
