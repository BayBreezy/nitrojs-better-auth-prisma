import { z } from "zod";
export default defineEventHandler({
  // onRequest: [requireAuth],
  handler: async (event) => {
    // Get the ID from the event
    const { id } = await getValidatedRouterParams(
      event,
      z.object({ id: z.number({ coerce: true }) }).parse,
    );

    // Find the record that should be deleted
    const upload = await prisma.upload.findUnique({
      where: { id },
    });
    if (!upload) {
      throw createError({
        statusCode: 404,
        statusMessage: "The file could not be found.",
      });
    }
    // Delete the record
    await prisma.upload.delete({
      where: { id },
    });
    // delete file from disk
    const storage = useStorage("uploads");
    const itemAvailable = await storage.hasItem(upload.filename);
    if (!itemAvailable) {
      return { message: "File deleted" };
    }
    await storage.removeItem(upload.filename, { removeMeta: true });
    return { message: "File deleted" };
  },
});
