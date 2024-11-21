import AxiosClient from "@/core/infrastructure/http/axios-client";
import { AuthService } from "@/features/auth/services/auth.datasource";
import { jwtDecode } from "jwt-decode";

// Mocks
jest.mock("jwt-decode");
jest.mock("@/core/infrastructure/http/axios-client", () => ({
  getInstance: jest.fn(),
}));

describe("AuthService", () => {
  let authService: AuthService;
  const mockAxiosClient = {
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (AxiosClient.getInstance as jest.Mock).mockReturnValue(mockAxiosClient);
    authService = AuthService.getInstance() as AuthService;
  });

  describe("getInstance", () => {
    it("should create only one instance (singleton)", () => {
      const instance1 = AuthService.getInstance();
      const instance2 = AuthService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("login", () => {
    it("should login successfully and decode token", async () => {
      const mockUser = { email: "test@example.com", password: "password123" };
      const mockToken = "mock-token";
      const mockDecodedAuth = {
        user: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          username: "johndoe",
          role: "USER",
        },
        token: mockToken,
        exp: 123456789,
      };

      mockAxiosClient.post.mockResolvedValue({
        data: { data: { token: mockToken } },
      });
      (jwtDecode as jest.Mock).mockReturnValue({
        sub: "1",
        first_name: "John",
        last_name: "Doe",
        email: "test@example.com",
        username: "johndoe",
        role: "USER",
        exp: 123456789,
      });

      const result = await authService.login(mockUser);
      expect(mockAxiosClient.post).toHaveBeenCalledWith("api/v1/auth/login", {
        user: mockUser,
      });
      expect(result).toEqual(mockDecodedAuth);
    });
  });

  describe("register", () => {
    it("should register successfully and decode token", async () => {
      const mockUser = {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "test@example.com",
        password: "password123",
      };
      const mockToken = "mock-token";
      const mockDecodedAuth = {
        user: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          username: "johndoe",
          role: "USER",
        },
        token: mockToken,
        exp: 123456789,
      };

      mockAxiosClient.post.mockResolvedValue({
        data: { data: { token: mockToken } },
      });
      (jwtDecode as jest.Mock).mockReturnValue({
        sub: "1",
        first_name: "John",
        last_name: "Doe",
        email: "test@example.com",
        username: "johndoe",
        role: "USER",
        exp: 123456789,
      });

      const result = await authService.register(mockUser);
      expect(mockAxiosClient.post).toHaveBeenCalledWith("api/v1/auth/signup", {
        user: mockUser,
      });
      expect(result).toEqual(mockDecodedAuth);
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      await authService.logout();
      expect(mockAxiosClient.delete).toHaveBeenCalledWith("api/v1/auth/logout");
    });
  });

  describe("emailGender", () => {
    it("should send email gender request successfully", async () => {
      const mockEmail = { email: "test@example.com" };
      const mockMessage = "Email sent successfully";

      mockAxiosClient.post.mockResolvedValue({
        data: { message: mockMessage },
      });

      const result = await authService.emailGender(mockEmail);
      expect(mockAxiosClient.post).toHaveBeenCalledWith(
        "api/v1/auth/password",
        {
          user: mockEmail,
        }
      );
      expect(result).toBe(mockMessage);
    });
  });

  describe("recoveryPassword", () => {
    it("should recover password successfully", async () => {
      const mockRecovery = {
        password: "newpassword123",
        passwordConfirmation: "newpassword123",
        resetPasswordToken: "token123",
      };
      const mockMessage = "Password updated successfully";

      mockAxiosClient.put.mockResolvedValue({
        data: { message: mockMessage },
      });

      const result = await authService.recoveryPassword(mockRecovery);
      expect(mockAxiosClient.put).toHaveBeenCalledWith("api/v1/auth/password", {
        user: mockRecovery,
      });
      expect(result).toBe(mockMessage);
    });
  });

  describe("decodeToken", () => {
    it("should decode token successfully", () => {
      const mockToken = "valid-token";
      const mockDecodedToken = {
        sub: "1",
        first_name: "John",
        last_name: "Doe",
        email: "test@example.com",
        username: "johndoe",
        role: "USER",
        exp: 123456789,
      };

      (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);

      const result = authService.decodeToken(mockToken);
      expect(result).toEqual({
        user: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          username: "johndoe",
          role: "USER",
        },
        token: mockToken,
        exp: 123456789,
      });
    });
  });

  describe("error handling", () => {
    it("should handle API errors in login", async () => {
      mockAxiosClient.post.mockRejectedValue(new Error("API Error"));
      const mockUser = { email: "test@example.com", password: "password123" };

      await expect(authService.login(mockUser)).rejects.toThrow("API Error");
    });

    it("should handle API errors in register", async () => {
      mockAxiosClient.post.mockRejectedValue(new Error("API Error"));
      const mockUser = {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "test@example.com",
        password: "password123",
      };

      await expect(authService.register(mockUser)).rejects.toThrow("API Error");
    });
  });
});
