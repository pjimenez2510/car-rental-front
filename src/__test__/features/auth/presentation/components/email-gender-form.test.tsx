import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import EmailGenderForm from "@/features/auth/presentation/components/email-gender-form";

jest.mock("@/features/auth/hooks/use-auth-operations", () => ({
  useAuthOperations: jest.fn(),
}));

describe("EmailGenderForm", () => {
  const mockEmailGenderHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthOperations as jest.Mock).mockReturnValue({
      emailGenderHandler: mockEmailGenderHandler,
    });
  });

  it("renders form elements correctly", () => {
    render(<EmailGenderForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enviar email/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/inicia sesión/i)).toBeInTheDocument();
  });

  it("handles form submission with valid email", async () => {
    render(<EmailGenderForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockEmailGenderHandler).toHaveBeenCalledWith({
        email: "test@example.com",
      });
    });
  });

  it("shows validation error for empty email", async () => {
    render(<EmailGenderForm />);

    const submitButton = screen.getByRole("button", { name: /enviar email/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("El email es requerido")
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    render(<EmailGenderForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("El email no es válido")
    ).toBeInTheDocument();
  });

  it("handles loading state during submission", async () => {
    mockEmailGenderHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<EmailGenderForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(emailInput, "test@example.com");
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

  it("navigates to login page when clicking on login link", async () => {
    render(<EmailGenderForm />);

    const loginLink = screen.getByText(/inicia sesión/i);
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("disables form submission during loading", async () => {
    mockEmailGenderHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<EmailGenderForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("shows spinner during form submission", async () => {
    mockEmailGenderHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<EmailGenderForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /enviar email/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.click(submitButton);

    expect(document.getElementById("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        document.getElementById("loading-spinner")
      ).not.toBeInTheDocument();
    });
  });
});
