import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecoveryForm from "@/features/auth/presentation/components/recovery-form";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  cn: (...args: unknown[]) => args.join(" "),
}));

describe("RecoveryForm", () => {
  const mockRecoveryPasswordHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      recoveryPasswordHandler: mockRecoveryPasswordHandler,
    });
  });

  it("renders form elements correctly", () => {
    render(<RecoveryForm />);

    // Verificar campos de contraseña
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();

    // Verificar botones y enlaces
    expect(
      screen.getByRole("button", { name: /enviar email/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/inicia sesión/i)).toHaveAttribute(
      "href",
      "/login"
    );
  });

  it("handles form submission with valid matching passwords", async () => {
    render(<RecoveryForm />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRecoveryPasswordHandler).toHaveBeenCalledWith({
        password: "password123",
        passwordConfirmation: "password123",
      });
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<RecoveryForm />);

    const submitButton = screen.getByRole("button", { name: /enviar email/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("La contraseña es requerida")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("La contraseña de confirmación es requerida")
    ).toBeInTheDocument();
  });

  it("shows validation error for non-matching passwords", async () => {
    render(<RecoveryForm />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "differentpassword");
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });

  it("handles loading state during submission", async () => {
    mockRecoveryPasswordHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<RecoveryForm />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");
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

  it("disables submit button during form submission", async () => {
    mockRecoveryPasswordHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<RecoveryForm />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("shows loading spinner during form submission", async () => {
    mockRecoveryPasswordHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<RecoveryForm />);

    const passwordInput = screen.getByLabelText(/^contraseña$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");
    await userEvent.click(submitButton);

    expect(document.getElementById("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        document.getElementById("loading-spinner")
      ).not.toBeInTheDocument();
    });
  });
});
