import serveStatic from "serve-static";
export default defineNitroPlugin(async (plugin) => {
  // Serve static files from the uploads directory
  plugin.h3App.stack.unshift({
    route: "/uploads",
    handler: fromNodeMiddleware(serveStatic("./uploads", { index: false, maxAge: "1d" })),
  });
});
