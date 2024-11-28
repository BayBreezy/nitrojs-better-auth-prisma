import cors from "cors";
export default defineNitroPlugin((plugin) => {
  plugin.h3App.use(
    fromNodeMiddleware(
      cors({
        origin: "*",
      }),
    ),
  );
});
