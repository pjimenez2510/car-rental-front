export const mockSession = {
  user: {
    name: "Test User",
    email: "test@example.com",
    image: "https://example.com/image.jpg",
  },
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
};

export const mockUseSession = jest.fn(() => ({
  data: mockSession,
  status: "authenticated",
}));
