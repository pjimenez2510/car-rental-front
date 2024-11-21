import { getErrors } from "@/lib/get-errors";
import { render, screen } from "@testing-library/react";

describe("getErrors", () => {
  const renderAndGetMessages = (errors: Parameters<typeof getErrors>[0]) => {
    render(getErrors(errors) as React.ReactElement);
    return screen.getAllByText(/.+/); // Obtiene todos los elementos con texto
  };

  describe("Manejo de strings", () => {
    it("debería renderizar un único mensaje de error cuando recibe un string", () => {
      const error = "Error message";
      const messages = renderAndGetMessages(error);

      expect(messages).toHaveLength(1);
      expect(messages[0]).toHaveTextContent(error);
      expect(messages[0]).toHaveClass("text-red-500");
    });
  });

  describe("Manejo de arrays de strings", () => {
    it("debería renderizar múltiples mensajes de error cuando recibe un array de strings", () => {
      const errors = ["Error 1", "Error 2", "Error 3"];
      const messages = renderAndGetMessages(errors);

      expect(messages).toHaveLength(3);
      errors.forEach((error, index) => {
        expect(messages[index]).toHaveTextContent(error);
        expect(messages[index]).toHaveClass("text-red-500");
      });
    });

    it("debería manejar un array vacío de strings", () => {
      const errors: string[] = [];
      const result = render(getErrors(errors) as React.ReactElement);

      expect(result.container.firstChild).toBeInstanceOf(HTMLDivElement);
      expect(result.container.firstChild?.childNodes).toHaveLength(0);
    });
  });

  describe("Manejo de objetos de error", () => {
    it("debería extraer el primer mensaje de error de un objeto", () => {
      const errorObject = {
        field1: "Error message 1",
        field2: "Error message 2",
      };
      const messages = renderAndGetMessages(errorObject);

      expect(messages).toHaveLength(1);
      expect(messages[0]).toHaveTextContent("Error message 1");
      expect(messages[0]).toHaveClass("text-red-500");
    });

    it("debería manejar objetos de error anidados", () => {
      const errorObject = {
        nestedField: "Nested error message",
      };
      const messages = renderAndGetMessages(errorObject);

      expect(messages).toHaveLength(1);
      expect(messages[0]).toHaveTextContent("Nested error message");
    });
  });

  describe("Estructura del DOM", () => {
    it("debería renderizar los errores dentro de un contenedor con la clase correcta", () => {
      const error = "Test error";
      render(getErrors(error) as React.ReactElement);

      const container = screen.getByText(error).parentElement;
      expect(container).toHaveClass("error-container");
    });

    it("debería renderizar cada mensaje en un párrafo separado", () => {
      const errors = ["Error 1", "Error 2"];
      render(getErrors(errors) as React.ReactElement);

      const paragraphs = screen.getAllByText(/Error/);
      expect(paragraphs).toHaveLength(2);
      paragraphs.forEach((p) => {
        expect(p.tagName).toBe("P");
        expect(p).toHaveClass("text-red-500");
      });
    });
  });
});
