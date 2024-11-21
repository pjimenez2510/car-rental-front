// src/__test__/features/auth/hooks/use-login.test.ts
import { renderHook, act } from "@testing-library/react";
import { useAuthOperations } from "../../../../features/auth/hooks/use-auth-operations";
import { useLogin } from "@/features/auth/hooks/use-login-form";

jest.mock("../../../../features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("useLogin", () => {
  const mockLoginHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      loginHandler: mockLoginHandler,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.methods.getValues()).toEqual({
      email: "",
      password: "",
    });
  });

  it("should handle form submission with valid data", async () => {
    const { result } = renderHook(() => useLogin());
    const validData = {
      email: "test@example.com",
      password: "password123",
    };

    await act(async () => {
      result.current.methods.setValue("email", validData.email);
      result.current.methods.setValue("password", validData.password);
      await result.current.onSubmit(validData);
    });

    expect(mockLoginHandler).toHaveBeenCalledWith(validData);
  });

  it("should show validation error for invalid email", async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.methods.setValue("email", "invalid-email");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email no es válido"
    );
  });

  it("should show validation error for empty fields", async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email es requerido"
    );
    expect(result.current.methods.formState.errors.password?.message).toBe(
      "La contraseña debe tener como mínimo 6 carácteres"
    );
  });

  it("should show validation error for short password", async () => {
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.methods.setValue("password", "12345");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.methods.formState.errors.password?.message).toBe(
      "La contraseña debe tener como mínimo 6 carácteres"
    );
  });

  it("should track submission state correctly", async () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.isSubmiting).toBe(false);

    mockLoginHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    await act(async () => {
      result.current.methods.setValue("email", "test@example.com");
      result.current.methods.setValue("password", "password123");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.isSubmiting).toBe(false);
  });

  it("should validate multiple scenarios correctly", async () => {
    const { result } = renderHook(() => useLogin());

    // Test invalid email
    await act(async () => {
      result.current.methods.setValue("email", "invalid-email");
      result.current.methods.setValue("password", "valid123");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email no es válido"
    );

    // Test short password
    await act(async () => {
      result.current.methods.setValue("email", "test@example.com");
      result.current.methods.setValue("password", "12345");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.password?.message).toBe(
      "La contraseña debe tener como mínimo 6 carácteres"
    );

    // Test valid data
    await act(async () => {
      result.current.methods.setValue("email", "test@example.com");
      result.current.methods.setValue("password", "valid123");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.email).toBeUndefined();
    expect(result.current.methods.formState.errors.password).toBeUndefined();
  });
});
