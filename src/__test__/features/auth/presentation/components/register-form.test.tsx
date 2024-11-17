import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import RegisterForm from "@/features/auth/presentation/components/register-form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/features/auth/hooks/use-auth-facade", () => ({
  useAuthFacade: jest.fn(),
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

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registrarse" })
    ).toBeInTheDocument();
    expect(screen.getByText("Ya tenés una cuenta?")).toBeInTheDocument();
  });

  it("handles form submission with valid data", async () => {
    render(<RegisterForm />);

    const firstNameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const usernameInput = screen.getByLabelText("Nombre de usuario");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    await userEvent.type(firstNameInput, "Test");
    await userEvent.type(lastNameInput, "User");
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegisterHandler).toHaveBeenCalledWith({
        firstName: "Test",
        lastName: "User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<RegisterForm />);

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
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

    const emailInput = screen.getByLabelText("Email");
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("El email no es válido")
    ).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText("Contraseña");
    await userEvent.type(passwordInput, "12345");

    const submitButton = screen.getByRole("button", { name: "Registrarse" });
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

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Contraseña");
    const firstNameInput = screen.getByLabelText("Nombre");
    const lastNameInput = screen.getByLabelText("Apellido");
    const usernameInput = screen.getByLabelText("Nombre de usuario");

    const submitButton = screen.getByRole("button", { name: "Registrarse" });

    await userEvent.type(firstNameInput, "Test");
    await userEvent.type(lastNameInput, "User");
    await userEvent.type(usernameInput, "testuser");
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
