import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  afterAll,
} from "vitest";
import { join } from "path";
import { writeFileSync, mkdirSync, unlinkSync, rmdirSync } from "fs";

import { InputParser } from "../inputParser";

describe("InputParser", () => {
  const testDir = join(__dirname, "test-files");
  const validJsonPath = join(testDir, "valid.json");
  const invalidJsonPath = join(testDir, "invalid.json");
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    mkdirSync(testDir, { recursive: true });
    writeFileSync(validJsonPath, '{"test": "data"}');
    writeFileSync(invalidJsonPath, "{invalid:json}");
  });

  afterEach(() => {
    try {
      unlinkSync(validJsonPath);
      unlinkSync(invalidJsonPath);
      rmdirSync(testDir);
    } catch (error) {
      console.error(error);
    }

    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it("should parse valid JSON file successfully", () => {
    const parser = new InputParser(validJsonPath);
    const result = parser.parse();
    expect(result).toEqual({ test: "data" });
  });

  it("should return null for non-existent file", () => {
    const parser = new InputParser("nonexistent.json");
    const result = parser.parse();
    expect(result).toBeNull();
  });

  it("should return null for invalid JSON content", () => {
    const parser = new InputParser(invalidJsonPath);
    const result = parser.parse();
    expect(result).toBeNull();
  });

  it("should return null when parsing a directory", () => {
    const parser = new InputParser(testDir);
    const result = parser.parse();
    expect(result).toBeNull();
  });
});
