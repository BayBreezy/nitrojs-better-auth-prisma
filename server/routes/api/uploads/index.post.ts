import { createId } from "@paralleldrive/cuid2";

export default defineEventHandler({
  //  Uncomment this if you want to require authentication for this endpoint
  // onRequest: [requireAuth],
  handler: async (event) => {
    const files = await readMultipartFormData(event);
    // Simple validation to ensure that files were uploaded
    if (!files || !files.length) {
      throw createError({
        statusCode: 400,
        statusMessage: "No files uploaded",
      });
    }
    // Create an instance of the storage driver
    const storage = useStorage("uploads");
    // Hold the list of uploaded files to return to the client
    const uploaded = [];
    for (const file of files) {
      const id = createId();
      const ext = file.filename?.split(".").pop();
      const filename = `${id}.${ext}`;
      const url = `/uploads/${filename}`;
      await storage.setItemRaw(filename, file.data);
      const data = await prisma.upload.create({
        data: {
          filename,
          url,
          mimetype: file.type,
          size: file.data.byteLength,
        },
      });
      uploaded.push(data);
    }

    return { data: uploaded };
  },
});
