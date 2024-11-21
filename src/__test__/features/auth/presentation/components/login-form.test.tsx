import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/features/auth/presentation/components/login-form";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("LoginForm", () => {
  const mockLoginHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      loginHandler: mockLoginHandler,
    });
  });

  it("renders form elements correctly", () => {
    render(<LoginForm />);

    // Verificar campos del formulario
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    // Verificar botón de submit
    expect(
      screen.getByRole("button", { name: /ingresar/i })
    ).toBeInTheDocument();

    // Verificar enlaces
    expect(screen.getByText(/¿olvidaste tu contraseña\?/i)).toHaveAttribute(
      "href",
      "/forgot-password"
    );
    expect(screen.getByText(/registrate/i)).toHaveAttribute(
      "href",
      "/register"
    );
    expect(screen.getByText(/no tienes una cuenta\?/i)).toBeInTheDocument();
  });

  it("handles form submission with valid data", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginHandler).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

    await userEvent.click(submitButton);

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
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /ingresar/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("El email no es válido")
    ).toBeInTheDocument();
  });

  it("shows validation error for short password", async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/contraseña/i);
    await userEvent.type(passwordInput, "12345");

    const submitButton = screen.getByRole("button", { name: /ingresar/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(
        "La contraseña debe tener como mínimo 6 carácteres"
      )
    ).toBeInTheDocument();
  });

  it("handles loading state during submission", async () => {
    mockLoginHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", { name: /ingresar/i });

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

  it("navigates to registration page when clicking register link", async () => {
    render(<LoginForm />);

    const registerLink = screen.getByText(/registrate/i);
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("navigates to forgot password page when clicking forgot password link", async () => {
    render(<LoginForm />);

    const forgotPasswordLink = screen.getByText(/¿olvidaste tu contraseña\?/i);
    expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });
});
