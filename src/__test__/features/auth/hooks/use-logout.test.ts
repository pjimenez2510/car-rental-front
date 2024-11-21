import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("useLogout", () => {
  const mockLogoutHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      logoutHandler: mockLogoutHandler,
    });
  });

  it("debería exponer la función onLogout", () => {
    const { result } = renderHook(() => useLogout());

    expect(result.current).toHaveProperty("onLogout");
    expect(typeof result.current.onLogout).toBe("function");
  });

  it("debería llamar a logoutHandler cuando se ejecuta onLogout", async () => {
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.onLogout();
    });

    expect(mockLogoutHandler).toHaveBeenCalled();
    expect(mockLogoutHandler).toHaveBeenCalledTimes(1);
  });

  it("debería manejar el caso exitoso de logout", async () => {
    mockLogoutHandler.mockResolvedValue(undefined);
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.onLogout();
    });

    expect(mockLogoutHandler).toHaveBeenCalled();
  });

  it("debería manejar errores durante el logout", async () => {
    const error = new Error("Error durante el logout");
    mockLogoutHandler.mockRejectedValue(error);
    console.error = jest.fn();

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.onLogout();
    });

    expect(mockLogoutHandler).toHaveBeenCalled();
  });

  it("debería esperar a que el logout se complete", async () => {
    // Simulamos un delay en el logout
    let isLogoutComplete = false;
    mockLogoutHandler.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      isLogoutComplete = true;
    });

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.onLogout();
    });

    expect(isLogoutComplete).toBe(true);
  });

  it("debería mantener la referencia de la función onLogout entre renders", () => {
    const { result, rerender } = renderHook(() => useLogout());
    const firstOnLogout = result.current.onLogout;

    rerender();
    const secondOnLogout = result.current.onLogout;

    expect(firstOnLogout).toBe(secondOnLogout);
  });
});
