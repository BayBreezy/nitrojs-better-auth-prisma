export default defineEventHandler({
  // The user has to be logged in to access this route
  onRequest: [requireAuth],
  handler: async (event) => {
    setResponseStatus(event, 201, "Secret data");
    // Use the attached auth data attached to the context in the require auth event handler
    return { message: "Secret data", user: event.context.auth };
  },
});
