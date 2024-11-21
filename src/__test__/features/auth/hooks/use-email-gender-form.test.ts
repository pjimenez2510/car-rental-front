import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useEmailGenderForm } from "@/features/auth/hooks/use-email-gender-form";
import { renderHook, act } from "@testing-library/react";

// Mocks
jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("useEmailGenderForm", () => {
  const mockEmailGenderHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      emailGenderHandler: mockEmailGenderHandler,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useEmailGenderForm());
    expect(result.current.methods.getValues()).toEqual({
      email: "",
    });
  });

  it("should handle valid email submission", async () => {
    const validEmail = "test@example.com";
    const { result } = renderHook(() => useEmailGenderForm());

    await act(async () => {
      result.current.methods.setValue("email", validEmail);
      // Ejecutar validación
      await result.current.methods.handleSubmit(async (data) => {
        await result.current.onSubmit(data);
      })();
    });

    expect(mockEmailGenderHandler).toHaveBeenCalledWith({
      email: validEmail,
    });
  });

  it("should show validation error for invalid email", async () => {
    const invalidEmail = "invalid-email";
    const { result } = renderHook(() => useEmailGenderForm());

    await act(async () => {
      result.current.methods.setValue("email", invalidEmail);
      // Ejecutar el handleSubmit para forzar la validación
      await result.current.methods.handleSubmit(() => {})();
    });

    // Esperar a que la validación se complete
    const errors = result.current.methods.formState.errors;
    expect(errors.email?.message).toBe("El email no es válido");
  });

  it("should show validation error for empty email", async () => {
    const { result } = renderHook(() => useEmailGenderForm());

    await act(async () => {
      // Simular el envío del formulario vacío
      await result.current.methods.handleSubmit(() => {})();
    });

    const errors = result.current.methods.formState.errors;
    expect(errors.email?.message).toBe("El email es requerido");
  });

  it("should track submission state correctly", async () => {
    const validEmail = "test@example.com";
    const { result } = renderHook(() => useEmailGenderForm());

    expect(result.current.isSubmiting).toBe(false);

    await act(async () => {
      result.current.methods.setValue("email", validEmail);
      await result.current.methods.handleSubmit(async (data) => {
        await result.current.onSubmit(data);
      })();
    });

    expect(result.current.isSubmiting).toBe(false);
  });

  it("should validate different email formats", async () => {
    const { result } = renderHook(() => useEmailGenderForm());

    // Test invalid email
    await act(async () => {
      result.current.methods.setValue("email", "test");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email no es válido"
    );

    // Test valid email
    await act(async () => {
      result.current.methods.setValue("email", "test@example.com");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.email).toBeUndefined();

    // Test empty email
    await act(async () => {
      result.current.methods.setValue("email", "");
      await result.current.methods.handleSubmit(() => {})();
    });
    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email es requerido"
    );
  });
});
