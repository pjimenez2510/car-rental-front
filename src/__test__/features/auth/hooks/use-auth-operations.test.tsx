// use-auth-operations.test.tsx
import { renderHook } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { AuthService } from "@/features/auth/services/auth.datasource";
import { login } from "@/features/auth/services/actions/login";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock de window.location
const mockReplace = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    replace: mockReplace,
  },
  writable: true,
});

jest.mock("@/features/auth/services/auth.datasource", () => ({
  AuthService: {
    getInstance: jest.fn(),
  },
}));

jest.mock("@/features/auth/services/actions/login", () => ({
  login: jest.fn(),
}));

describe("useAuthOperations", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    emailGender: jest.fn(),
    recoveryPassword: jest.fn(),
  };
  const mockSearchParams = new URLSearchParams();
  const mockGetSearchParams = jest
    .fn()
    .mockImplementation((param) => mockSearchParams.get(param));

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGetSearchParams,
    });
    (AuthService.getInstance as jest.Mock).mockReturnValue(mockAuthService);
  });

  describe("loginHandler", () => {
    it("should handle successful login", async () => {
      // Arrange
      const loginData = { email: "test@test.com", password: "123456" };
      const mockResponse = { user: { role: "USER" } };
      mockAuthService.login.mockResolvedValue(mockResponse);
      (login as jest.Mock).mockResolvedValue({
        ok: true,
        message: "Login exitoso",
      });

      // Act
      const { result } = renderHook(() => useAuthOperations());
      await result.current.loginHandler(loginData);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
      expect(login).toHaveBeenCalledWith(mockResponse);
      expect(toast.success).toHaveBeenCalledWith("Login exitoso");
      expect(mockReplace).toHaveBeenCalled();
    });

    it("should not redirect if login action fails", async () => {
      // Arrange
      const loginData = { email: "test@test.com", password: "123456" };
      const mockResponse = { user: { role: "USER" } };
      mockAuthService.login.mockResolvedValue(mockResponse);
      (login as jest.Mock).mockResolvedValue({ ok: false });

      // Act
      const { result } = renderHook(() => useAuthOperations());
      await result.current.loginHandler(loginData);

      // Assert
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe("logoutHandler", () => {
    it("should handle logout successfully", async () => {
      // Act
      const { result } = renderHook(() => useAuthOperations());
      await result.current.logoutHandler();

      // Assert
      expect(signOut).toHaveBeenCalled();
      expect(mockAuthService.logout).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Sesión cerrada exitosamente");
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });

  describe("recoveryPasswordHandler", () => {
    it("should handle missing reset token", async () => {
      // Arrange
      const recoveryData = {
        password: "newPassword",
        passwordConfirmation: "newPassword",
      };

      // Act
      const { result } = renderHook(() => useAuthOperations());
      await result.current.recoveryPasswordHandler(recoveryData);

      // Assert
      expect(toast.error).toHaveBeenCalledWith(
        "El token de reseteo no ha sido probehido"
      );
      expect(mockAuthService.recoveryPassword).not.toHaveBeenCalled();
    });

    it("should handle successful password recovery", async () => {
      // Arrange
      mockSearchParams.append("reset_password_token", "valid-token");
      const recoveryData = {
        password: "newPassword",
        passwordConfirmation: "newPassword",
      };
      mockAuthService.recoveryPassword.mockResolvedValue(
        "Contraseña actualizada"
      );

      // Act
      const { result } = renderHook(() => useAuthOperations());
      await result.current.recoveryPasswordHandler(recoveryData);

      // Assert
      expect(mockAuthService.recoveryPassword).toHaveBeenCalledWith({
        ...recoveryData,
        resetPasswordToken: "valid-token",
      });
      expect(toast.success).toHaveBeenCalledWith("Contraseña actualizada");
    });
  });
});
