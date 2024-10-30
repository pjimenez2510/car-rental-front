import { renderHook, act } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";
import { useAuthFacade } from "@/features/auth/hooks/use-auth-facade";
import { useRegister } from "@/features/auth/hooks/use-register-form";

jest.mock("@/features/auth/hooks/use-auth-facade", () => ({
  useAuthFacade: jest.fn(),
}));

const createWrapper = () => {
  return function Wrapper({ children }: { children: ReactNode }) {
    const methods = useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
};

describe("useRegister hook", () => {
  const mockRegisterHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthFacade as jest.Mock).mockReturnValue({
      registerHandler: mockRegisterHandler,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });

    expect(result.current.methods.getValues()).toEqual({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
    expect(result.current.isSubmiting).toBe(false);
  });

  it("should handle form submission with valid data", async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.methods.setValue("firstName", "Test");
      result.current.methods.setValue("lastName", "User");
      result.current.methods.setValue("username", "testuser");
      result.current.methods.setValue("email", "test@example.com");
      result.current.methods.setValue("password", "password123");
    });

    await act(async () => {
      await result.current.onSubmit({
        firstName: "Test",
        lastName: "User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(mockRegisterHandler).toHaveBeenCalledWith({
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
  });
});
