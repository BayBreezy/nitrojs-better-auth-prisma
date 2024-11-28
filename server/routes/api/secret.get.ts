export default defineEventHandler({
  // The user has to be logged in to access this route
  onRequest: [requireAuth],
  handler: async (event) => {
    setResponseStatus(event, 201, "Secret data");
    return { message: "Secret data" };
  },
});
