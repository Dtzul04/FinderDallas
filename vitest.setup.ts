import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// wipe the rendered page between tests so they don't affect each other
afterEach(() => {
  cleanup();
});
