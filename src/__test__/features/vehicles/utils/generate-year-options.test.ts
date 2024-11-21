import { generateYearOptions } from "@/features/vehicles/utils/generate-year-options";

describe("generateYearOptions", () => {
  const mockCurrentYear = 2024;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockCurrentYear, 0, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("generates correct year options from given year to current year", () => {
    const startYear = 2020;
    const options = generateYearOptions(startYear);

    expect(options).toHaveLength(5);
    expect(options[0]).toEqual({ value: "2024", label: "2024" });
    expect(options[4]).toEqual({ value: "2020", label: "2020" });
  });

  test("returns empty array when start year is greater than current year", () => {
    const options = generateYearOptions(2025);
    expect(options).toHaveLength(0);
  });

  test("handles single year range", () => {
    const options = generateYearOptions(2024);
    expect(options).toHaveLength(1);
    expect(options[0]).toEqual({ value: "2024", label: "2024" });
  });
});
