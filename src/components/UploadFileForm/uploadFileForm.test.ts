import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { handleFileUpload } from "./uploadFileHandler";

describe("handleFileUpload", () => {
  beforeEach(() => {
    global.FileReader = class {
      onload:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null = null;
      onerror:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null = null;

      readAsText(file: Blob) {
        setTimeout(() => {
          if (this.onload) {
            const text =
              file instanceof File && file.name === "invalid.json"
                ? "{ invalid }" // Return invalid JSON for the invalid case
                : JSON.stringify({
                    roads: {
                      north: {
                        vehicles: [
                          {
                            vehicleId: "1",
                            movement: { from: "north", to: "east" },
                          },
                        ],
                      },
                      east: { vehicles: [] },
                      south: { vehicles: [] },
                      west: { vehicles: [] },
                    },
                  });
            // @ts-expect-error onload is mocked
            this.onload({
              target: { result: text },
            } as ProgressEvent<FileReader>);
          }
        }, 0);
      }
    } as unknown as typeof FileReader;
  });

  afterEach(() => {
    vi.resetAllMocks();
    global.FileReader = undefined as unknown as typeof FileReader;
  });

  it("calls onFileUpload with parsed JSON data when a valid JSON file is uploaded", async () => {
    const mockSetOpen = vi.fn();
    const mockOnFileUpload = vi.fn();
    const mockSetError = vi.fn();
    const validJson = JSON.stringify({
      roads: {
        north: {
          vehicles: [
            {
              vehicleId: "1",
              movement: { from: "north", to: "east" },
            },
          ],
        },
        east: { vehicles: [] },
        south: { vehicles: [] },
        west: { vehicles: [] },
      },
    });

    const file = new File([validJson], "valid.json", {
      type: "application/json",
    });

    await handleFileUpload(file, mockOnFileUpload, mockSetError, mockSetOpen);

    expect(mockOnFileUpload).toHaveBeenCalledWith(JSON.parse(validJson));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it("sets an error when the uploaded file contains invalid JSON", async () => {
    const mockSetOpen = vi.fn();
    const mockOnFileUpload = vi.fn();
    const mockSetError = vi.fn();
    const invalidJson = "{ invalid }";

    const file = new File([invalidJson], "invalid.json", {
      type: "application/json",
    });

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await handleFileUpload(file, mockOnFileUpload, mockSetError, mockSetOpen);

    expect(mockOnFileUpload).not.toHaveBeenCalled();
    expect(mockSetOpen).not.toHaveBeenCalled();
    expect(mockSetError).toHaveBeenCalledWith("file", {
      message: "Invalid JSON format",
    });

    consoleErrorSpy.mockRestore();
  });
});
