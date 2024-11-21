import { renderHook, act } from "@testing-library/react";
import { useVehicleForm } from "@/features/vehicles/hooks/use-vehicle-form";
import { useRouter } from "next/navigation";
import useVehicleOperations from "@/features/vehicles/hooks/use-vehicle-operations";
import { VehicleStatus } from "@/features/vehicles/interfaces/vehicle.interface";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/features/vehicles/hooks/use-vehicle-operations", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("useVehicleForm", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockVehicleOperations = {
    createVehicle: jest.fn(),
    updateVehicle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useVehicleOperations as jest.Mock).mockReturnValue(mockVehicleOperations);
  });

  it("should initialize with default values when no vehicle is provided", () => {
    const { result } = renderHook(() => useVehicleForm({}));

    const currentYear = new Date().getFullYear();
    const defaultValues = result.current.methods.getValues();

    expect(defaultValues).toEqual({
      brand: "",
      url: "",
      model: "",
      year: currentYear,
      licensePlate: "",
      vehicleTypeId: "",
    });
  });

  describe("form validation", () => {
    it("should show error for empty brand", async () => {
      const { result } = renderHook(() => useVehicleForm({}));

      await act(async () => {
        result.current.methods.setValue("brand", "");
        await result.current.methods.handleSubmit(() => {})();
      });

      const errors = result.current.methods.formState.errors;
      expect(errors.brand?.message).toBe("La marca es requerida");
    });

    it("should show error for invalid image URL", async () => {
      const { result } = renderHook(() => useVehicleForm({}));

      await act(async () => {
        result.current.methods.setValue("url", "invalid-url");
        await result.current.methods.handleSubmit(() => {})();
      });

      const errors = result.current.methods.formState.errors;
      expect(errors.url?.message).toBe("Debe ser una URL válida");
    });

    it("should show error for invalid image extension", async () => {
      const { result } = renderHook(() => useVehicleForm({}));

      await act(async () => {
        result.current.methods.setValue("url", "https://example.com/image.txt");
        await result.current.methods.handleSubmit(() => {})();
      });

      const errors = result.current.methods.formState.errors;
      expect(errors.url?.message).toBe(
        "La URL debe terminar en una extensión de imagen válida (.jpg, .jpeg, .png, .gif, .webp, .svg, .avif)"
      );
    });

    it("should validate year range", async () => {
      const { result } = renderHook(() => useVehicleForm({}));

      await act(async () => {
        result.current.methods.setValue("year", 2011);
        await result.current.methods.handleSubmit(() => {})();
      });

      const errors = result.current.methods.formState.errors;
      expect(errors.year?.message).toBe("El año debe ser mayor a 2012");
    });

    it("should accept valid data", async () => {
      const { result } = renderHook(() => useVehicleForm({}));
      const validData = {
        brand: "Toyota",
        url: "https://example.com/image.jpg",
        model: "Corolla",
        year: 2023,
        licensePlate: "ABC123",
        vehicleTypeId: "1",
      };

      await act(async () => {
        Object.entries(validData).forEach(([key, value]) => {
          result.current.methods.setValue(key as keyof typeof validData, value);
        });
        await result.current.methods.handleSubmit(() => {})();
      });

      expect(result.current.methods.formState.errors).toEqual({});
    });
  });

  describe("form submission", () => {
    it("should call createVehicle with correct data", async () => {
      const { result } = renderHook(() => useVehicleForm({}));
      const validData = {
        brand: "Toyota",
        url: "https://example.com/image.jpg",
        model: "Corolla",
        year: 2023,
        licensePlate: "ABC123",
        vehicleTypeId: "1",
      };

      await act(async () => {
        Object.entries(validData).forEach(([key, value]) => {
          result.current.methods.setValue(key as keyof typeof validData, value);
        });
        await result.current.onSubmit(validData);
      });

      expect(mockVehicleOperations.createVehicle).toHaveBeenCalledWith({
        ...validData,
        vehicleTypeId: 1,
      });
    });

    it("should call updateVehicle with correct data when vehicle exists", async () => {
      const mockVehicle = {
        id: 1,
        brand: "Toyota",
        url: "https://example.com/image.jpg",
        model: "Corolla",
        year: 2023,
        licensePlate: "ABC123",
        vehicleType: { id: 1, name: "Sedan" },
        status: VehicleStatus.Available,
      };

      const { result } = renderHook(() =>
        useVehicleForm({ vehicle: mockVehicle })
      );
      const updatedData = {
        brand: "Honda",
        url: "https://example.com/new-image.jpg",
        model: "Civic",
        year: 2024,
        licensePlate: "XYZ789",
        vehicleTypeId: "2",
      };

      await act(async () => {
        Object.entries(updatedData).forEach(([key, value]) => {
          result.current.methods.setValue(
            key as keyof typeof updatedData,
            value
          );
        });
        await result.current.onSubmit(updatedData);
      });

      expect(mockVehicleOperations.updateVehicle).toHaveBeenCalledWith(
        mockVehicle.id,
        {
          ...updatedData,
          vehicleTypeId: 2,
        },
        mockVehicle
      );
    });
  });

  describe("navigation", () => {
    it("should navigate to list on cancel", () => {
      const { result } = renderHook(() => useVehicleForm({}));

      act(() => {
        result.current.onCancel();
      });

      expect(mockRouter.push).toHaveBeenCalledWith("/management/vehicles/list");
    });
  });
});
