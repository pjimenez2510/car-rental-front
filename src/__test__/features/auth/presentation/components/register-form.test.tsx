import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/features/auth/presentation/components/register-form";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("RegisterForm", () => {
  const mockRegisterHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      registerHandler: mockRegisterHandler,
    });
  });

  it("renders form elements correctly", () => {
    render(<RegisterForm />);

    // Usamos una búsqueda más específica para el campo de nombre
    expect(
      screen.getByRole("textbox", { name: /^nombre$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /apellido/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /nombre de usuario/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ya tenés una cuenta/i)).toBeInTheDocument();
    expect(screen.getByText(/inicia sesión/i)).toBeInTheDocument();
  });

  it("handles form submission with valid data", async () => {
    render(<RegisterForm />);

    const firstNameInput = screen.getByRole("textbox", { name: /^nombre$/i });
    const lastNameInput = screen.getByRole("textbox", { name: /apellido/i });
    const usernameInput = screen.getByRole("textbox", {
      name: /nombre de usuario/i,
    });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /registrarse/i });

    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(usernameInput, "johndoe");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegisterHandler).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", { name: /registrarse/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("El nombre es requerido")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("El apellido es requerido")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("El nombre de usuario es requerido")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("El email es requerido")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "La contraseña debe tener como mínimo 6 carácteres"
      )
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInput, "invalid-email");
    const submitButton = screen.getByRole("button", { name: /registrarse/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("El email no es válido")
    ).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    await userEvent.type(passwordInput, "12345");
    const submitButton = screen.getByRole("button", { name: /registrarse/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(
        "La contraseña debe tener como mínimo 6 carácteres"
      )
    ).toBeInTheDocument();
  });

  it("handles loading state during submission", async () => {
    mockRegisterHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<RegisterForm />);
    const firstNameInput = screen.getByRole("textbox", { name: /^nombre$/i });
    const lastNameInput = screen.getByRole("textbox", { name: /apellido/i });
    const usernameInput = screen.getByRole("textbox", {
      name: /nombre de usuario/i,
    });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /registrarse/i });

    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Doe");
    await userEvent.type(usernameInput, "johndoe");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(document.getElementById("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(
        document.getElementById("loading-spinner")
      ).not.toBeInTheDocument();
    });
  });
});
