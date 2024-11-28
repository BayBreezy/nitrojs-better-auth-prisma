export default defineEventHandler({
  handler: async (event) => {
    return sendRedirect(event, "/api/auth/docs");
  },
});
