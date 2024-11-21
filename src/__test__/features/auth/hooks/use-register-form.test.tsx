import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useRegister } from "@/features/auth/hooks/use-register-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { act, renderHook } from "@testing-library/react";

// Mocks
jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(),
}));

describe("useRegister", () => {
  const mockRegisterHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      registerHandler: mockRegisterHandler,
    });
    (zodResolver as jest.Mock).mockReturnValue(jest.fn());
  });

  it("debería inicializar el formulario con valores por defecto", () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current.methods.getValues()).toEqual({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
  });

  it("debería exponer las funciones y estados necesarios", () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current).toHaveProperty("onSubmit");
    expect(result.current).toHaveProperty("methods");
    expect(result.current).toHaveProperty("isSubmiting");
  });

  describe("Validación de firstName", () => {
    it("debería mostrar error cuando el nombre está vacío", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        await result.current.methods.trigger("firstName");
      });

      expect(result.current.methods.formState.errors.firstName?.message).toBe(
        "El nombre es requerido"
      );
    });

    it("no debería mostrar error con un nombre válido", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("firstName", "John");
        await result.current.methods.trigger("firstName");
      });

      expect(result.current.methods.formState.errors.firstName).toBeUndefined();
    });
  });

  describe("Validación de lastName", () => {
    it("debería mostrar error cuando el apellido está vacío", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        await result.current.methods.trigger("lastName");
      });

      expect(result.current.methods.formState.errors.lastName?.message).toBe(
        "El apellido es requerido"
      );
    });

    it("no debería mostrar error con un apellido válido", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("lastName", "Doe");
        await result.current.methods.trigger("lastName");
      });

      expect(result.current.methods.formState.errors.lastName).toBeUndefined();
    });
  });

  describe("Validación de username", () => {
    it("debería mostrar error cuando el nombre de usuario está vacío", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        await result.current.methods.trigger("username");
      });

      expect(result.current.methods.formState.errors.username?.message).toBe(
        "El nombre de usuario es requerido"
      );
    });

    it("no debería mostrar error con un nombre de usuario válido", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("username", "johndoe");
        await result.current.methods.trigger("username");
      });

      expect(result.current.methods.formState.errors.username).toBeUndefined();
    });
  });

  describe("Validación de email", () => {
    it("debería mostrar error cuando el email está vacío", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        await result.current.methods.trigger("email");
      });

      expect(result.current.methods.formState.errors.email?.message).toBe(
        "El email es requerido"
      );
    });

    it("debería mostrar error cuando el email es inválido", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("email", "invalid-email");
        await result.current.methods.trigger("email");
      });

      expect(result.current.methods.formState.errors.email?.message).toBe(
        "El email no es válido"
      );
    });

    it("no debería mostrar error con un email válido", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("email", "test@example.com");
        await result.current.methods.trigger("email");
      });

      expect(result.current.methods.formState.errors.email).toBeUndefined();
    });
  });

  describe("Validación de password", () => {
    it("debería mostrar error cuando la contraseña es muy corta", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("password", "12345");
        await result.current.methods.trigger("password");
      });

      expect(result.current.methods.formState.errors.password?.message).toBe(
        "La contraseña debe tener como mínimo 6 carácteres"
      );
    });

    it("no debería mostrar error con una contraseña válida", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("password", "123456");
        await result.current.methods.trigger("password");
      });

      expect(result.current.methods.formState.errors.password).toBeUndefined();
    });
  });

  describe("Manejo del formulario completo", () => {
    const validFormData = {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
    };

    it("debería llamar registerHandler con los datos correctos al hacer submit", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        Object.entries(validFormData).forEach(([key, value]) => {
          result.current.methods.setValue(
            key as keyof typeof validFormData,
            value
          );
        });
        await result.current.onSubmit(validFormData);
      });

      expect(mockRegisterHandler).toHaveBeenCalledWith(validFormData);
    });

    it("debería actualizar isSubmiting durante el proceso de envío", async () => {
      const { result } = renderHook(() => useRegister());

      mockRegisterHandler.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      let isSubmittingDuringSubmission = false;

      await act(async () => {
        Object.entries(validFormData).forEach(([key, value]) => {
          result.current.methods.setValue(
            key as keyof typeof validFormData,
            value
          );
        });
        const submitPromise = result.current.onSubmit(validFormData);
        isSubmittingDuringSubmission = result.current.isSubmiting;
        await submitPromise;
      });

      expect(isSubmittingDuringSubmission).toBe(true);
      expect(result.current.isSubmiting).toBe(false);
    });

    it("debería manejar errores durante el submit", async () => {
      const error = new Error("Submit error");
      mockRegisterHandler.mockRejectedValue(error);
      console.error = jest.fn();

      const { result } = renderHook(() => useRegister());

      await act(async () => {
        await result.current.onSubmit(validFormData);
      });

      expect(mockRegisterHandler).toHaveBeenCalledWith(validFormData);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("Validación de formulario completo", () => {
    it("debería ser válido cuando todos los campos son correctos", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        result.current.methods.setValue("firstName", "John");
        result.current.methods.setValue("lastName", "Doe");
        result.current.methods.setValue("username", "johndoe");
        result.current.methods.setValue("email", "john@example.com");
        result.current.methods.setValue("password", "password123");
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.isValid).toBe(true);
      expect(result.current.methods.formState.errors).toEqual({});
    });

    it("debería ser inválido cuando hay campos vacíos", async () => {
      const { result } = renderHook(() => useRegister());

      await act(async () => {
        await result.current.methods.trigger();
      });

      expect(result.current.methods.formState.isValid).toBe(false);
      expect(Object.keys(result.current.methods.formState.errors).length).toBe(
        5
      );
    });
  });

  describe("Integración con zodResolver", () => {
    it("debería configurar el resolver de zod correctamente", () => {
      renderHook(() => useRegister());
      expect(zodResolver).toHaveBeenCalled();
    });
  });
});
