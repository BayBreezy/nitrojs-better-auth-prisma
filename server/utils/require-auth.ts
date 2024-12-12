import type { EventHandler, H3Event } from "h3";

/**
 * Middleware used to require authentication for a route.
 *
 * Can be extended to check for specific roles or permissions.
 */
export const requireAuth: EventHandler = async (event: H3Event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  if (!session)
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  // Attach the session to the event
  event.context.auth = session;
};
