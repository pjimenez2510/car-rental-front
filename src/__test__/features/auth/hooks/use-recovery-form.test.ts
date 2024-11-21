import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useRecoveryForm } from "@/features/auth/hooks/use-recovery-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(),
}));

describe("useRecoveryForm", () => {
  const mockRecoveryPasswordHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      recoveryPasswordHandler: mockRecoveryPasswordHandler,
    });
    (zodResolver as jest.Mock).mockReturnValue(jest.fn());
  });

  it("debería inicializar el formulario con valores por defecto", () => {
    const { result } = renderHook(() => useRecoveryForm());

    expect(result.current.methods.getValues()).toEqual({
      password: "",
      passwordConfirmation: "",
    });
  });

  it("debería exponer las funciones y estados necesarios", () => {
    const { result } = renderHook(() => useRecoveryForm());

    expect(result.current).toHaveProperty("onSubmit");
    expect(result.current).toHaveProperty("methods");
    expect(result.current).toHaveProperty("isSubmiting");
  });

  describe("Validación de contraseña", () => {
    it("debería mostrar error cuando la contraseña está vacía", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        await result.current.methods.trigger("password");
      });

      expect(result.current.methods.formState.errors.password?.message).toBe(
        "La contraseña es requerida"
      );
    });

    it("no debería mostrar error cuando la contraseña es válida", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        result.current.methods.setValue("password", "validPassword123");
        await result.current.methods.trigger("password");
      });

      expect(result.current.methods.formState.errors.password).toBeUndefined();
    });
  });

  describe("Validación de confirmación de contraseña", () => {
    it("debería mostrar error cuando la confirmación está vacía", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        await result.current.methods.trigger("passwordConfirmation");
      });

      expect(
        result.current.methods.formState.errors.passwordConfirmation?.message
      ).toBe("La contraseña de confirmación es requerida");
    });

    it("debería mostrar error cuando las contraseñas no coinciden", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        result.current.methods.setValue("password", "password123");
        result.current.methods.setValue(
          "passwordConfirmation",
          "differentPassword123"
        );
        await result.current.methods.trigger();
      });

      expect(
        result.current.methods.formState.errors.passwordConfirmation?.message
      ).toBe("Las contraseñas no coinciden");
    });

    it("no debería mostrar error cuando las contraseñas coinciden", async () => {
      const { result } = renderHook(() => useRecoveryForm());
      const password = "validPassword123";

      await act(async () => {
        result.current.methods.setValue("password", password);
        result.current.methods.setValue("passwordConfirmation", password);
        await result.current.methods.trigger();
      });

      expect(
        result.current.methods.formState.errors.passwordConfirmation
      ).toBeUndefined();
    });
  });

  describe("Manejo del formulario completo", () => {
    const validFormData = {
      password: "validPassword123",
      passwordConfirmation: "validPassword123",
    };

    it("debería llamar recoveryPasswordHandler con los datos correctos al hacer submit", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        result.current.methods.setValue("password", validFormData.password);
        result.current.methods.setValue(
          "passwordConfirmation",
          validFormData.passwordConfirmation
        );
        await result.current.onSubmit(validFormData);
      });

      expect(mockRecoveryPasswordHandler).toHaveBeenCalledWith(validFormData);
    });

    it("debería actualizar isSubmiting durante el proceso de envío", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      // Simulamos que recoveryPasswordHandler toma tiempo en resolver
      mockRecoveryPasswordHandler.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      let isSubmittingDuringSubmission = false;

      await act(async () => {
        result.current.methods.setValue("password", validFormData.password);
        result.current.methods.setValue(
          "passwordConfirmation",
          validFormData.passwordConfirmation
        );
        const submitPromise = result.current.onSubmit(validFormData);
        isSubmittingDuringSubmission = result.current.isSubmiting;
        await submitPromise;
      });

      expect(isSubmittingDuringSubmission).toBe(true);
      expect(result.current.isSubmiting).toBe(false);
    });

    it("debería manejar errores durante el submit", async () => {
      const error = new Error("Submit error");
      mockRecoveryPasswordHandler.mockRejectedValue(error);
      console.error = jest.fn();

      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        await result.current.onSubmit(validFormData);
      });

      expect(mockRecoveryPasswordHandler).toHaveBeenCalledWith(validFormData);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Validación de formulario completo", () => {
    it("debería ser válido cuando todos los campos son correctos y coinciden", async () => {
      const { result } = renderHook(() => useRecoveryForm());
      const password = "validPassword123";

      await act(async () => {
        result.current.methods.setValue("password", password);
        result.current.methods.setValue("passwordConfirmation", password);
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.isValid).toBe(true);
      expect(result.current.methods.formState.errors).toEqual({});
    });

    it("debería ser inválido cuando los campos están vacíos", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.isValid).toBe(false);
      expect(Object.keys(result.current.methods.formState.errors)).toHaveLength(
        2
      );
    });

    it("debería ser inválido cuando las contraseñas no coinciden", async () => {
      const { result } = renderHook(() => useRecoveryForm());

      await act(async () => {
        result.current.methods.setValue("password", "password123");
        result.current.methods.setValue("passwordConfirmation", "different123");
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.isValid).toBe(false);
      expect(
        result.current.methods.formState.errors.passwordConfirmation
      ).toBeDefined();
    });
  });

  describe("Integración con zodResolver", () => {
    it("debería configurar el resolver de zod correctamente", () => {
      renderHook(() => useRecoveryForm());
      expect(zodResolver).toHaveBeenCalled();
    });
  });
});
