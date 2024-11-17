// useLogin.test.tsx
import { renderHook, act } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";
import { useAuthOperations } from "@/features/auth/hooks/use-auth-operations";
import { useLogin } from "@/features/auth/hooks/use-login-form";

jest.mock("@/features/auth/hooks/use-auth-facade", () => ({
  useAuthFacade: jest.fn(),
}));

const createWrapper = () => {
  return function Wrapper({ children }: { children: ReactNode }) {
    const methods = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
};

describe("useLogin hook", () => {
  const mockLoginHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock de la implementación del hook
    (useAuthOperations as jest.Mock).mockReturnValue({
      loginHandler: mockLoginHandler,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current.methods.getValues()).toEqual({
      email: "",
      password: "",
    });
    expect(result.current.isSubmiting).toBe(false);
  });

  it("should handle form submission with valid data", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.methods.setValue("email", "test@example.com");
      result.current.methods.setValue("password", "password123");
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(mockLoginHandler).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
