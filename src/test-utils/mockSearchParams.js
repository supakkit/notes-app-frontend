import { vi } from "vitest";

let mockSearchParams = new URLSearchParams();
export const mockSetSearchParams = vi.fn((params, options) => {
  if (params instanceof URLSearchParams) {
    mockSearchParams = new URLSearchParams(params);
  } else {
    mockSearchParams = new URLSearchParams(Object.entries(params));
  }
  mockSearchParams.replaceFlag = options?.replace ?? false;
});

export const __mockSearchParams = {
  
  get searchString() {
    const str = mockSearchParams.toString();
    return str ? `?${str}` : "";
  },
  reset() {
    mockSearchParams = new URLSearchParams();
    mockSetSearchParams.mockClear();
  },
};

// vi.mock("react-router-dom", () => ({
//   useSearchParams: () => [mockSearchParams, mockSetSearchParams],
// }));