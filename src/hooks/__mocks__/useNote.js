import { vi } from "vitest";

let mockNotes = [];

const setNotes = vi.fn((newNotes) => {
  // support functional updates: setNotes(prev => ...)
  mockNotes = typeof newNotes === "function" ? newNotes(mockNotes) : newNotes;
});

export const useNote = () => ({
  get notes() {
    return mockNotes;
  },
  setNotes,
});

export const __mockNotes = {
  get value() {
    return mockNotes;
  },
  set value(v) {
    mockNotes = v;
  },
  reset() {
    mockNotes = [];
    setNotes.mockClear();
  },
};
