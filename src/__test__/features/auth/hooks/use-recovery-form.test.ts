import { renderHook, act } from "@testing-library/react";
import { useRecoveryForm } from "@/features/auth/hooks/use-recovery-form";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("useRecoveryForm", () => {
  const mockRecoveryPasswordHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      recoveryPasswordHandler: mockRecoveryPasswordHandler,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useRecoveryForm());

    expect(result.current.methods.getValues()).toEqual({
      password: "",
      passwordConfirmation: "",
    });
  });

  it("should handle form submission with valid matching passwords", async () => {
    const { result } = renderHook(() => useRecoveryForm());
    const validData = {
      password: "password123",
      passwordConfirmation: "password123",
    };

    await act(async () => {
      result.current.methods.setValue("password", validData.password);
      result.current.methods.setValue(
        "passwordConfirmation",
        validData.passwordConfirmation
      );
      await result.current.onSubmit(validData);
    });

    expect(mockRecoveryPasswordHandler).toHaveBeenCalledWith(validData);
  });

  it("should show validation errors for empty fields", async () => {
    const { result } = renderHook(() => useRecoveryForm());

    await act(async () => {
      await result.current.methods.handleSubmit(() => {})();
    });

    const errors = result.current.methods.formState.errors;
    expect(errors.password?.message).toBe("La contraseña es requerida");
    expect(errors.passwordConfirmation?.message).toBe(
      "La contraseña de confirmación es requerida"
    );
  });

  it("should show validation error for non-matching passwords", async () => {
    const { result } = renderHook(() => useRecoveryForm());

    await act(async () => {
      result.current.methods.setValue("password", "password123");
      result.current.methods.setValue(
        "passwordConfirmation",
        "differentpassword"
      );
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(
      result.current.methods.formState.errors.passwordConfirmation?.message
    ).toBe("Las contraseñas no coinciden");
  });

  it("should track submission state", async () => {
    const { result } = renderHook(() => useRecoveryForm());

    expect(result.current.isSubmiting).toBe(false);

    mockRecoveryPasswordHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const validData = {
      password: "password123",
      passwordConfirmation: "password123",
    };

    await act(async () => {
      await result.current.onSubmit(validData);
    });

    expect(mockRecoveryPasswordHandler).toHaveBeenCalledWith(validData);
  });

  it("should clear errors when valid matching passwords are entered", async () => {
    const { result } = renderHook(() => useRecoveryForm());

    // Primero establecemos errores con contraseñas que no coinciden
    await act(async () => {
      result.current.methods.setValue("password", "password123");
      result.current.methods.setValue("passwordConfirmation", "different");
      await result.current.methods.handleSubmit(() => {})();
    });

    // Verificamos que hay error de no coincidencia
    expect(
      result.current.methods.formState.errors.passwordConfirmation?.message
    ).toBe("Las contraseñas no coinciden");

    // Ahora establecemos contraseñas válidas que coinciden
    await act(async () => {
      result.current.methods.setValue("password", "password123");
      result.current.methods.setValue("passwordConfirmation", "password123");
      await result.current.methods.handleSubmit(() => {})();
    });

    // Verificamos que los errores se han limpiado
    expect(result.current.methods.formState.errors.password).toBeUndefined();
    expect(
      result.current.methods.formState.errors.passwordConfirmation
    ).toBeUndefined();
  });

  it("should validate fields independently before matching", async () => {
    const { result } = renderHook(() => useRecoveryForm());

    // Probar validación de campo vacío para password
    await act(async () => {
      result.current.methods.setValue("password", "");
      result.current.methods.setValue("passwordConfirmation", "somepassword");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(result.current.methods.formState.errors.password?.message).toBe(
      "La contraseña es requerida"
    );

    // Probar validación de campo vacío para passwordConfirmation
    await act(async () => {
      result.current.methods.setValue("password", "somepassword");
      result.current.methods.setValue("passwordConfirmation", "");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(
      result.current.methods.formState.errors.passwordConfirmation?.message
    ).toBe("La contraseña de confirmación es requerida");
  });

  it("should maintain validation error until passwords match", async () => {
    const { result } = renderHook(() => useRecoveryForm());

    // Primera validación con contraseñas diferentes
    await act(async () => {
      result.current.methods.setValue("password", "password123");
      result.current.methods.setValue("passwordConfirmation", "different");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(
      result.current.methods.formState.errors.passwordConfirmation?.message
    ).toBe("Las contraseñas no coinciden");

    // Actualizar solo una contraseña manteniendo la diferencia
    await act(async () => {
      result.current.methods.setValue("password", "newpassword123");
      await result.current.methods.handleSubmit(() => {})();
    });

    expect(
      result.current.methods.formState.errors.passwordConfirmation?.message
    ).toBe("Las contraseñas no coinciden");
  });
});
