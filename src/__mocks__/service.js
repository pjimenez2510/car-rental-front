import { rest } from "msw";

export const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    // Mock the login response
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: "1",
          name: "John Doe",
          role: "admin",
        },
        token: "mock-token",
      })
    );
  }),
];
