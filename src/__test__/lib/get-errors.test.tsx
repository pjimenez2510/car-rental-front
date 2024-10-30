import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getErrors } from "@/lib/get-errors";

describe("getErrors", () => {
  test("should return undefined when errors is undefined", () => {
    const result = getErrors(undefined);
    expect(result).toBeUndefined();
  });

  test("should render a single error message", () => {
    const singleError = "This is an error message";
    const { container } = render(getErrors(singleError));

    expect(container.querySelector("div")).toBeInTheDocument();
    expect(screen.getByText(singleError)).toBeInTheDocument();
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  test("should render multiple error messages", () => {
    const multipleErrors = [
      "First error message",
      "Second error message",
      "Third error message",
    ];

    const { container } = render(getErrors(multipleErrors));

    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelectorAll("p")).toHaveLength(3);

    multipleErrors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  test("should render nothing when empty array is provided", () => {
    const { container } = render(getErrors([]));

    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  test("should render empty string correctly", () => {
    const { container } = render(getErrors(""));
    expect(container).toBeEmptyDOMElement();
  });

  test("should match snapshot with multiple errors", () => {
    const multipleErrors = ["First error message", "Second error message"];

    const { container } = render(getErrors(multipleErrors));
    expect(container).toMatchSnapshot();
  });
});
