import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import LoginForm from "@/features/auth/presentation/components/login-form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthFacade: jest.fn(),
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
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ingresar/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/¿olvidaste tu contraseña\?/i)).toBeInTheDocument();
    expect(screen.getByText(/no tienes una cuenta\?/i)).toBeInTheDocument();
  });

  it("handles form submission with valid data", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
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

    const emailInput = screen.getByLabelText(/email/i);
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

    const emailInput = screen.getByLabelText(/email/i);
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
});
