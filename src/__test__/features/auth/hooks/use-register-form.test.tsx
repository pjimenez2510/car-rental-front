import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useRegister } from "@/features/auth/hooks/use-register-form";
import { renderHook, act } from "@testing-library/react";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("useRegister", () => {
  const mockRegisterHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      registerHandler: mockRegisterHandler,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useRegister());
    expect(result.current.methods.getValues()).toEqual({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
  });

  it("should handle form submission with valid data", async () => {
    const { result } = renderHook(() => useRegister());
    const validData = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "test@example.com",
      password: "password123",
    };

    await act(async () => {
      result.current.methods.setValue("firstName", validData.firstName);
      result.current.methods.setValue("lastName", validData.lastName);
      result.current.methods.setValue("username", validData.username);
      result.current.methods.setValue("email", validData.email);
      result.current.methods.setValue("password", validData.password);
      await result.current.onSubmit(validData);
    });

    expect(mockRegisterHandler).toHaveBeenCalledWith(validData);
  });

  it("should show validation errors for empty fields", async () => {
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.methods.handleSubmit(() => {})();
    });

    const errors = result.current.methods.formState.errors;
    expect(errors.firstName?.message).toBe("El nombre es requerido");
    expect(errors.lastName?.message).toBe("El apellido es requerido");
    expect(errors.username?.message).toBe("El nombre de usuario es requerido");
    expect(errors.email?.message).toBe("El email es requerido");
    expect(errors.password?.message).toBe(
      "La contraseña debe tener como mínimo 6 carácteres"
    );
  });

  it("should validate email format", async () => {
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      result.current.methods.setValue("email", "invalid-email");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email no es válido"
    );
  });

  it("should validate password length", async () => {
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      result.current.methods.setValue("password", "12345");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.methods.formState.errors.password?.message).toBe(
      "La contraseña debe tener como mínimo 6 carácteres"
    );
  });

  it("should handle submission state", async () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current.isSubmiting).toBe(false);

    mockRegisterHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const validData = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "test@example.com",
      password: "password123",
    };

    await act(async () => {
      await result.current.onSubmit(validData);
    });

    expect(mockRegisterHandler).toHaveBeenCalledWith(validData);
  });

  it("should validate form fields individually", async () => {
    const { result } = renderHook(() => useRegister());

    // Test firstName validation
    await act(async () => {
      result.current.methods.setValue("firstName", "");
      // Usamos handleSubmit en lugar de trigger para asegurar la validación
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.firstName?.message).toBe(
      "El nombre es requerido"
    );

    // Test email validation
    await act(async () => {
      result.current.methods.setValue("email", "invalid");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email no es válido"
    );

    // Test password validation
    await act(async () => {
      result.current.methods.setValue("password", "12345");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.password?.message).toBe(
      "La contraseña debe tener como mínimo 6 carácteres"
    );
  });

  it("should clear errors when valid data is entered", async () => {
    const { result } = renderHook(() => useRegister());

    // Primero establecemos errores
    await act(async () => {
      await result.current.methods.handleSubmit(() => {})();
    });

    // Verificamos errores iniciales
    expect(result.current.methods.formState.errors.firstName?.message).toBe(
      "El nombre es requerido"
    );

    // Establecemos valores válidos
    await act(async () => {
      result.current.methods.setValue("firstName", "John");
      result.current.methods.setValue("lastName", "Doe");
      result.current.methods.setValue("username", "johndoe");
      result.current.methods.setValue("email", "test@example.com");
      result.current.methods.setValue("password", "password123");
      await result.current.methods.handleSubmit(() => {})();
    });

    // Verificamos que no hay errores
    expect(result.current.methods.formState.errors.firstName).toBeUndefined();
    expect(result.current.methods.formState.errors.lastName).toBeUndefined();
    expect(result.current.methods.formState.errors.username).toBeUndefined();
    expect(result.current.methods.formState.errors.email).toBeUndefined();
    expect(result.current.methods.formState.errors.password).toBeUndefined();
  });
});
