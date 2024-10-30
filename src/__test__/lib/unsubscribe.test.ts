import queryClient from "@/core/infrastructure/react-query/query-client";
import { unsubscribe } from "@/lib/unsubscribe";

// Mock queryClient
jest.mock("@/core/infrastructure/react-query/query-client", () => ({
  cancelQueries: jest.fn(),
}));

describe("Unsubscribe Function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    test("should call cancelQueries with provided query keys", async () => {
      const queryKeys = ["query1", "query2"];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
      expect(queryClient.cancelQueries).toHaveBeenCalledTimes(1);
    });

    test("should handle single query key", async () => {
      const queryKeys = ["singleQuery"];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
      expect(queryClient.cancelQueries).toHaveBeenCalledTimes(1);
    });

    test("should handle empty array", async () => {
      await unsubscribe([]);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: [],
      });
      expect(queryClient.cancelQueries).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error Handling", () => {
    test("should handle cancelQueries rejection", async () => {
      const error = new Error("Cancel failed");
      (queryClient.cancelQueries as jest.Mock).mockRejectedValueOnce(error);

      await expect(unsubscribe(["query1"])).rejects.toThrow("Cancel failed");
    });

    test("should handle undefined query keys", async () => {
      const queryKeys = [undefined, "query1"] as unknown as string[];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
    });
  });

  describe("Multiple Queries", () => {
    test("should handle multiple query keys", async () => {
      const queryKeys = ["query1", "query2", "query3", "query4"];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
      expect(queryClient.cancelQueries).toHaveBeenCalledTimes(1);
    });

    test("should handle duplicate query keys", async () => {
      const queryKeys = ["query1", "query1", "query2", "query2"];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
    });
  });

  describe("Query Key Formats", () => {
    test("should handle complex query keys", async () => {
      const queryKeys = ["users/123/posts", "comments/456", "profile/settings"];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
    });

    test("should handle query keys with special characters", async () => {
      const queryKeys = [
        "query/with/slashes",
        "query-with-dashes",
        "query_with_underscores",
      ];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
    });
  });

  describe("Performance", () => {
    test("should handle large number of queries efficiently", async () => {
      const largeQueryKeys = Array.from(
        { length: 1000 },
        (_, i) => `query${i}`
      );
      await unsubscribe(largeQueryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: largeQueryKeys,
      });
      expect(queryClient.cancelQueries).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    test("should handle very long query keys", async () => {
      const longQueryKey = "a".repeat(1000);
      await unsubscribe([longQueryKey]);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: [longQueryKey],
      });
    });

    test("should handle mixed content in query keys", async () => {
      const queryKeys = [
        "normalQuery",
        "query-with-special-chars-!@#$",
        "query/with/path",
        "query_with_underscore",
      ];
      await unsubscribe(queryKeys);

      expect(queryClient.cancelQueries).toHaveBeenCalledWith({
        queryKey: queryKeys,
      });
    });
  });
});
