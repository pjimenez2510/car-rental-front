import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { UserRole } from "@/features/users/interfaces/user.interface";
import { routesRedirectAuth } from "@/lib/routes-redirect";
import { AuthService } from "@/features/auth/services/auth.datasource";
import { act, renderHook } from "@testing-library/react";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { login } from "@/features/auth/services/actions/login";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

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

  const mockSearchParams = {
    get: jest.fn(),
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    emailGender: jest.fn(),
    logout: jest.fn(),
    recoveryPassword: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (AuthService.getInstance as jest.Mock).mockReturnValue(mockAuthService);
    window.location.replace = jest.fn();
  });

  describe("handleRedirect", () => {
    it("debería usar callbackUrl si está disponible", async () => {
      const callbackUrl = "/dashboard";
      mockSearchParams.get.mockReturnValue(callbackUrl);

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.loginHandler({
          email: "test@example.com",
          password: "password",
        });
      });

      expect(window.location.replace).toHaveBeenCalledWith(callbackUrl);
    });

    it("debería usar routesRedirectAuth si no hay callbackUrl", async () => {
      mockSearchParams.get.mockReturnValue(null);
      const userRole = UserRole.USER;
      const mockLoginResponse = {
        user: { role: userRole },
        token: "token",
      };

      mockAuthService.login.mockResolvedValue(mockLoginResponse);
      (login as jest.Mock).mockResolvedValue({ ok: true, message: "Success" });

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.loginHandler({
          email: "test@example.com",
          password: "password",
        });
      });

      expect(window.location.replace).toHaveBeenCalledWith(
        routesRedirectAuth[userRole]
      );
    });
  });

  describe("loginHandler", () => {
    const mockLoginData = {
      email: "test@example.com",
      password: "password123",
    };

    it("debería procesar un login exitoso", async () => {
      const mockLoginResponse = {
        user: { role: UserRole.USER },
        token: "mock-token",
      };

      mockAuthService.login.mockResolvedValue(mockLoginResponse);
      (login as jest.Mock).mockResolvedValue({
        ok: true,
        message: "Login exitoso",
      });

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.loginHandler(mockLoginData);
      });

      expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginData);
      expect(login).toHaveBeenCalledWith(mockLoginResponse);
      expect(toast.success).toHaveBeenCalledWith("Login exitoso");
    });

    it("no debería redireccionar si el login no es exitoso", async () => {
      const mockLoginResponse = {
        user: { role: UserRole.USER },
        token: "mock-token",
      };

      mockAuthService.login.mockResolvedValue(mockLoginResponse);
      (login as jest.Mock).mockResolvedValue({
        ok: false,
        message: "Error en login",
      });

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.loginHandler(mockLoginData);
      });

      expect(window.location.replace).not.toHaveBeenCalled();
      expect(toast.success).not.toHaveBeenCalled();
    });

    it("debería manejar errores en el login", async () => {
      const mockError = new Error("Error en login");
      mockAuthService.login.mockRejectedValue(mockError);
      console.error = jest.fn();

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.loginHandler(mockLoginData);
      });

      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("registerHandler", () => {
    const mockRegisterData = {
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };

    it("debería procesar un registro exitoso", async () => {
      const mockRegisterResponse = {
        user: { role: UserRole.USER },
        token: "mock-token",
      };

      mockAuthService.register.mockResolvedValue(mockRegisterResponse);
      (login as jest.Mock).mockResolvedValue({
        ok: true,
        message: "Registro exitoso",
      });

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.registerHandler(mockRegisterData);
      });

      expect(mockAuthService.register).toHaveBeenCalledWith(mockRegisterData);
      expect(toast.success).toHaveBeenCalled();
      expect(window.location.replace).toHaveBeenCalled();
    });

    it("debería manejar errores en el registro", async () => {
      const mockError = new Error("Error en registro");
      mockAuthService.register.mockRejectedValue(mockError);
      console.error = jest.fn();

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.registerHandler(mockRegisterData);
      });

      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("emailGenderHandler", () => {
    const mockEmailData = {
      email: "test@example.com",
    };

    it("debería procesar un envío de email exitoso", async () => {
      const successMessage = "Email enviado exitosamente";
      mockAuthService.emailGender.mockResolvedValue(successMessage);

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.emailGenderHandler(mockEmailData);
      });

      expect(mockAuthService.emailGender).toHaveBeenCalledWith(mockEmailData);
      expect(toast.success).toHaveBeenCalledWith(successMessage);
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });

    it("debería manejar errores en el envío de email", async () => {
      const mockError = new Error("Error en envío de email");
      mockAuthService.emailGender.mockRejectedValue(mockError);
      console.error = jest.fn();

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.emailGenderHandler(mockEmailData);
      });

      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("logoutHandler", () => {
    it("debería procesar un logout exitoso", async () => {
      mockAuthService.logout.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.logoutHandler();
      });

      expect(mockAuthService.logout).toHaveBeenCalled();
      expect(signOut).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Sesión cerrada exitosamente");
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });

    it("debería manejar errores en el logout", async () => {
      const mockError = new Error("Error en logout");
      mockAuthService.logout.mockRejectedValue(mockError);
      console.error = jest.fn();

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.logoutHandler();
      });

      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });

  describe("recoveryPasswordHandler", () => {
    const mockRecoveryData = {
      password: "newpassword123",
      passwordConfirmation: "newpassword123",
    };

    it("debería procesar una recuperación de contraseña exitosa", async () => {
      const successMessage = "Contraseña actualizada exitosamente";
      mockSearchParams.get.mockReturnValue("valid-token");
      mockAuthService.recoveryPassword.mockResolvedValue(successMessage);

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.recoveryPasswordHandler(mockRecoveryData);
      });

      expect(mockAuthService.recoveryPassword).toHaveBeenCalledWith({
        ...mockRecoveryData,
        resetPasswordToken: "valid-token",
      });
      expect(toast.success).toHaveBeenCalledWith(successMessage);
    });

    it("debería mostrar error cuando no hay token de reseteo", async () => {
      mockSearchParams.get.mockReturnValue(null);

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.recoveryPasswordHandler(mockRecoveryData);
      });

      expect(toast.error).toHaveBeenCalledWith(
        "El token de reseteo no ha sido probehido"
      );
      expect(mockAuthService.recoveryPassword).not.toHaveBeenCalled();
    });

    it("debería manejar errores en la recuperación de contraseña", async () => {
      const mockError = new Error("Error en recuperación");
      mockSearchParams.get.mockReturnValue("valid-token");
      mockAuthService.recoveryPassword.mockRejectedValue(mockError);
      console.error = jest.fn();

      const { result } = renderHook(() => useAuthOperations());

      await act(async () => {
        await result.current.recoveryPasswordHandler(mockRecoveryData);
      });

      expect(console.error).toHaveBeenCalledWith(mockError);
    });
  });
});
