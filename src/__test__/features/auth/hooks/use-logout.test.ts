import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { renderHook } from "@testing-library/react";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("useLogout", () => {
  it("should call logoutHandler when onLogout is executed", async () => {
    // Arrange
    const mockLogoutHandler = jest.fn();
    (useAuthOperations as jest.Mock).mockReturnValue({
      logoutHandler: mockLogoutHandler,
    });

    // Act
    const { result } = renderHook(() => useLogout());
    await result.current.onLogout();

    // Assert
    expect(mockLogoutHandler).toHaveBeenCalledTimes(1);
  });
});
