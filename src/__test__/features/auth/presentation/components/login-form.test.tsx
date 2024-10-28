import { useLogin } from "@/features/auth/hooks/use-login-form";
import LoginForm from "@/features/auth/presentation/components/login-form";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mockeamos el hook completo
jest.mock("@/features/auth/hooks/use-login-form", () => ({
  useLogin: jest.fn(),
}));

describe("LoginForm", () => {
  it("envía el formulario correctamente", async () => {
    // Creamos el mock del onSubmit
    const onSubmitMock = jest.fn();

    // Configuramos el hook mockeado para retornar los métodos necesarios
    (useLogin as jest.Mock).mockReturnValue({
      methods: {
        handleSubmit: (fn: () => void) => fn,
        register: jest.fn(),
        formState: { isSubmitting: false },
      },
      onSubmit: onSubmitMock,
      isSubmiting: false,
    });

    render(<LoginForm />);

    // Llenamos los campos del formulario
    fireEvent.change(screen.getByPlaceholderText("ejemplo@ejemplo.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "123456" },
    });

    // Enviamos el formulario
    fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    // Esperamos a que el mock de onSubmit sea llamado
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(onSubmitMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "123456",
      });
    });
  });
});
