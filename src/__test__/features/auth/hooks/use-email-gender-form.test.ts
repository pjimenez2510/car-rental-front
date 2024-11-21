import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useEmailGenderForm } from "@/features/auth/hooks/use-email-gender-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { act, renderHook } from "@testing-library/react";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(),
}));

describe("useEmailGenderForm", () => {
  const mockEmailGenderHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      emailGenderHandler: mockEmailGenderHandler,
    });
    (zodResolver as jest.Mock).mockReturnValue(jest.fn());
  });

  it("debería inicializar el formulario con valores por defecto", () => {
    const { result } = renderHook(() => useEmailGenderForm());

    expect(result.current.methods.getValues()).toEqual({
      email: "",
    });
  });

  it("debería exponer las funciones y estados necesarios", () => {
    const { result } = renderHook(() => useEmailGenderForm());

    expect(result.current).toHaveProperty("onSubmit");
    expect(result.current).toHaveProperty("methods");
    expect(result.current).toHaveProperty("isSubmiting");
  });

  it("debería mostrar error cuando el email está vacío", async () => {
    const { result } = renderHook(() => useEmailGenderForm());

    await act(async () => {
      await result.current.methods.trigger("email");
    });

    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email es requerido"
    );
  });

  it("debería mostrar error cuando el email es inválido", async () => {
    const { result } = renderHook(() => useEmailGenderForm());

    await act(async () => {
      result.current.methods.setValue("email", "invalid-email");
      await result.current.methods.trigger("email");
    });

    expect(result.current.methods.formState.errors.email?.message).toBe(
      "El email no es válido"
    );
  });

  it("no debería mostrar error con un email válido", async () => {
    const { result } = renderHook(() => useEmailGenderForm());

    await act(async () => {
      result.current.methods.setValue("email", "test@example.com");
      await result.current.methods.trigger("email");
    });

    expect(result.current.methods.formState.errors.email).toBeUndefined();
  });

  it("debería llamar emailGenderHandler con los datos correctos al hacer submit", async () => {
    const { result } = renderHook(() => useEmailGenderForm());
    const validEmail = "test@example.com";
    const submitData = { email: validEmail };

    await act(async () => {
      result.current.methods.setValue("email", validEmail);
      await result.current.onSubmit(submitData);
    });

    expect(mockEmailGenderHandler).toHaveBeenCalledWith(submitData);
  });

  it("debería actualizar isSubmiting durante el proceso de envío", async () => {
    const { result } = renderHook(() => useEmailGenderForm());
    const validEmail = "test@example.com";
    const submitData = { email: validEmail };

    // Simulamos que emailGenderHandler toma tiempo en resolver
    mockEmailGenderHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    let isSubmittingDuringSubmission = false;

    await act(async () => {
      result.current.methods.setValue("email", validEmail);
      const submitPromise = result.current.onSubmit(submitData);
      isSubmittingDuringSubmission = result.current.isSubmiting;
      await submitPromise;
    });

    expect(isSubmittingDuringSubmission).toBe(true);
    expect(result.current.isSubmiting).toBe(false);
  });

  it("debería manejar errores durante el submit", async () => {
    const error = new Error("Submit error");
    mockEmailGenderHandler.mockRejectedValue(error);
    console.error = jest.fn();

    const { result } = renderHook(() => useEmailGenderForm());
    const submitData = { email: "test@example.com" };

    await act(async () => {
      await result.current.onSubmit(submitData);
    });

    expect(mockEmailGenderHandler).toHaveBeenCalledWith(submitData);
    expect(console.error).toHaveBeenCalled();
  });

  describe("Integración con zodResolver", () => {
    it("debería configurar el resolver de zod correctamente", () => {
      renderHook(() => useEmailGenderForm());

      expect(zodResolver).toHaveBeenCalled();
    });
  });
});
