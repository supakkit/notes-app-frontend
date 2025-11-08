import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dashboard } from "./Dashboard";
import { describe, expect, test, vi, beforeEach } from "vitest";

// import "../test-utils/routerMock.js";
import { __mockSearchParams, mockSetSearchParams } from "../test-utils/mockSearchParams.js";
import { __mockNotes } from "../hooks/useNote.js";

// Mock hooks
vi.mock("../hooks/useAuth");
vi.mock("../hooks/useNote");

// Mock search params
vi.mock("react-router-dom", () => ({
  useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
}));

// Mock services
const mockGetUserNotes = vi.fn();
const mockDeleteUserNote = vi.fn();
const mockTogglePublicNote = vi.fn();
vi.mock("../services/note.service", () => ({
  getUserNotes: (...args) => mockGetUserNotes(...args),
  deleteUserNote: (...args) => mockDeleteUserNote(...args),
  togglePublicNote: (...args) => mockTogglePublicNote(...args),
}));

// Mock paginationHandler
const mockPaginationHandler = vi.fn(() => ({
  validatedPage: 1,
  validatedNotesPerPage: 5,
  validatedNoteTotal: 0,
}));
vi.mock("../utils/paginationHandler", () => ({
  paginationHandler: (...args) => mockPaginationHandler(...args),
}));

// Mock sub-components
vi.mock("../components/NoteForm", () => ({
  NoteForm: ({ children }) => <div data-testid="note-form">{children}</div>,
}));
vi.mock("../components/NoteCard", () => ({
  NoteCard: ({ note }) => <div data-testid="note-card">{note.title}</div>,
}));
vi.mock("../components/Search", () => ({
  Search: ({ searchQuery, setSearchQuery, handleSearch }) => (
    <form onSubmit={handleSearch}>
      <input
        data-testid="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  ),
}));
vi.mock("../components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

const mockNotesData = [
  { _id: "1", title: "Note 1" },
  { _id: "2", title: "Note 2" },
];

const mockNotesResponseData = {
  notes: mockNotesData,
  page: 1,
  limit: 5,
  total: 2,
};

const paginationHandlerMockReturnData = {
  validatedPage: 1,
  validatedNotesPerPage: 5,
  validatedNoteTotal: 2,
};

const resetAllTestMocks = () => {
  vi.clearAllMocks();
  __mockSearchParams.reset();
  __mockNotes.reset();
};

//////// Test suite ////////
describe("Dashboard Component", () => {
  beforeEach(() => {
    resetAllTestMocks();
  });

  test("renders welcome message with user name", async () => {
    mockGetUserNotes.mockResolvedValueOnce(mockNotesResponseData);

    render(<Dashboard />);

    expect(
      await screen.findByText("Welcome, Test User 👋")
    ).toBeInTheDocument();
  });

  test("renders notes when API returns notes", async () => {
    mockGetUserNotes.mockResolvedValueOnce(mockNotesResponseData);
    mockPaginationHandler.mockReturnValueOnce(paginationHandlerMockReturnData);

    render(<Dashboard />);

    for (const note of mockNotesData) {
      expect(await screen.findByText(note.title)).toBeInTheDocument();
    }
  });

  test("shows loading state while fetching notes", async () => {
    let resolveFn;
    mockGetUserNotes.mockImplementationOnce(
      () => new Promise((resolve) => (resolveFn = resolve))
    );

    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    resolveFn(mockNotesResponseData);
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );
  });

  test("shows empty message when there are no notes", async () => {
    mockGetUserNotes.mockResolvedValueOnce({
      ...mockNotesResponseData,
      notes: [],
      total: 0,
    });

    render(<Dashboard />);
    expect(await screen.findByText("There are no notes.")).toBeInTheDocument();
  });

  test("handles API error", async () => {
    mockGetUserNotes.mockRejectedValueOnce({
      response: { data: { message: "Failed to load notes." } },
    });

    render(<Dashboard />);
    expect(
      await screen.findByText("Failed to load notes.")
    ).toBeInTheDocument();
  });

  test("calls fetchNotes on search submit", async () => {
    mockGetUserNotes.mockResolvedValueOnce(mockNotesResponseData);

    render(<Dashboard />);

    const searchInput = screen.getByTestId("search-input");
    await userEvent.type(searchInput, "meeting");

    mockGetUserNotes.mockResolvedValueOnce({
      notes: [{ _id: "1", title: "Meeting notes" }],
      page: 1,
      limit: 5,
      total: 1,
    });

    const searchButton = screen.getByText("Search");
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockGetUserNotes).toHaveBeenCalledWith({
        page: 1,
        limit: 5,
        q: "meeting",
      });
    });
  });

  test("pagination next and prev buttons trigger fetchNotes correctly", async () => {
    mockGetUserNotes.mockResolvedValue({
      ...mockNotesResponseData,
      total: 5,
    });

    render(<Dashboard />);
    await waitFor(() => screen.getByText("Page 1 of 1"));

    const nextButton = screen.getByText("Next");
    await userEvent.click(nextButton); // fireEvent.click(nextButton);

    // currentPage=1, pageTotal=1, fetchNotes not called again
    expect(mockGetUserNotes).toHaveBeenCalledTimes(1);
  });

  test("updates URL search params when performing a search", async () => {
    mockGetUserNotes.mockResolvedValueOnce(mockNotesResponseData);

    render(<Dashboard />);

    const input = screen.getByTestId("search-input");
    await userEvent.type(input, "meeting");

    mockGetUserNotes.mockResolvedValueOnce({
      notes: [{ _id: "1", title: "Meeting notes" }],
      page: 1,
      limit: 5,
      total: 1,
    });

    const searchButton = screen.getByText("Search");
    await userEvent.click(searchButton);

    await waitFor(() => {
      const searchString = __mockSearchParams.searchString;
      expect(searchString).toContain("page=1");
      expect(searchString).toContain("limit=5");
      expect(searchString).toContain("q=meeting");
    });
  });
});
