import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useLogin } from "@/features/auth/hooks/use-login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { act, renderHook } from "@testing-library/react";

// Mocks
jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(),
}));

describe("useLogin", () => {
  const mockLoginHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      loginHandler: mockLoginHandler,
    });
    (zodResolver as jest.Mock).mockReturnValue(jest.fn());
  });

  it("debería inicializar el formulario con valores por defecto", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.methods.getValues()).toEqual({
      email: "",
      password: "",
    });
  });

  it("debería exponer las funciones y estados necesarios", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current).toHaveProperty("onSubmit");
    expect(result.current).toHaveProperty("methods");
    expect(result.current).toHaveProperty("isSubmiting");
  });

  describe("Validación de email", () => {
    it("debería mostrar error cuando el email está vacío", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.methods.trigger("email");
      });

      expect(result.current.methods.formState.errors.email?.message).toBe(
        "El email es requerido"
      );
    });

    it("debería mostrar error cuando el email es inválido", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("email", "invalid-email");
        await result.current.methods.trigger("email");
      });

      expect(result.current.methods.formState.errors.email?.message).toBe(
        "El email no es válido"
      );
    });

    it("no debería mostrar error con un email válido", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("email", "test@example.com");
        await result.current.methods.trigger("email");
      });

      expect(result.current.methods.formState.errors.email).toBeUndefined();
    });
  });

  describe("Validación de password", () => {
    it("debería mostrar error cuando la contraseña es muy corta", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("password", "12345");
        await result.current.methods.trigger("password");
      });

      expect(result.current.methods.formState.errors.password?.message).toBe(
        "La contraseña debe tener como mínimo 6 carácteres"
      );
    });

    it("no debería mostrar error con una contraseña válida", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("password", "123456");
        await result.current.methods.trigger("password");
      });

      expect(result.current.methods.formState.errors.password).toBeUndefined();
    });
  });

  describe("Manejo del formulario completo", () => {
    const validFormData = {
      email: "test@example.com",
      password: "123456",
    };

    it("debería llamar loginHandler con los datos correctos al hacer submit", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("email", validFormData.email);
        result.current.methods.setValue("password", validFormData.password);
        await result.current.onSubmit(validFormData);
      });

      expect(mockLoginHandler).toHaveBeenCalledWith(validFormData);
    });

    it("debería actualizar isSubmiting durante el proceso de envío", async () => {
      const { result } = renderHook(() => useLogin());

      // Simulamos que loginHandler toma tiempo en resolver
      mockLoginHandler.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      let isSubmittingDuringSubmission = false;

      await act(async () => {
        result.current.methods.setValue("email", validFormData.email);
        result.current.methods.setValue("password", validFormData.password);
        const submitPromise = result.current.onSubmit(validFormData);
        isSubmittingDuringSubmission = result.current.isSubmiting;
        await submitPromise;
      });

      expect(isSubmittingDuringSubmission).toBe(true);
      expect(result.current.isSubmiting).toBe(false);
    });

    it("debería manejar errores durante el submit", async () => {
      const error = new Error("Submit error");
      mockLoginHandler.mockRejectedValue(error);
      console.error = jest.fn();

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.onSubmit(validFormData);
      });

      expect(mockLoginHandler).toHaveBeenCalledWith(validFormData);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Validación de formulario completo", () => {
    it("no debería tener errores con datos válidos", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("email", "test@example.com");
        result.current.methods.setValue("password", "123456");
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.errors).toEqual({});
      expect(result.current.methods.formState.isValid).toBe(true);
    });

    it("debería tener errores con datos inválidos", async () => {
      const { result } = renderHook(() => useLogin());

      await act(async () => {
        result.current.methods.setValue("email", "invalid-email");
        result.current.methods.setValue("password", "12345");
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.errors.email).toBeDefined();
      expect(result.current.methods.formState.errors.password).toBeDefined();
      expect(result.current.methods.formState.isValid).toBe(false);
    });
  });

  describe("Integración con zodResolver", () => {
    it("debería configurar el resolver de zod correctamente", () => {
      renderHook(() => useLogin());

      expect(zodResolver).toHaveBeenCalled();
    });
  });
});
