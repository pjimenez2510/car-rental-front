import type { Config } from "jest";
import nextJest from "next/jest";
const createJestConfig = nextJest({
  dir: "./",
});
const config: Config = {
  preset: "ts-jest", // Usar ts-jest para manejar TypeScript
  testEnvironment: "jsdom", // Establecer el entorno de prueba

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "^msw/node$": "<rootDir>/node_modules/msw/lib/node",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next-auth)", // Asegúrate de que next-auth se transforme
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
export default createJestConfig(config);
