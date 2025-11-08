import { useCallback, useEffect, useState } from "react";
import { NoteForm } from "../components/NoteForm";
import { NoteCard } from "../components/NoteCard";
import { Search } from "../components/Search";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { paginationHandler } from "../utils/paginationHandler";
import {
  deleteUserNote,
  getUserNotes,
  togglePublicNote,
} from "../services/note.service";
import { useNote } from "../hooks/useNote";

export function Dashboard() {
  const { user } = useAuth();
  const { notes, setNotes } = useNote();

  // const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [notesPerPage, setNotesPerPage] = useState(0);
  const [noteTotal, setNoteTotal] = useState(0);
  const pageTotal = Math.max(
    1,
    Math.ceil((noteTotal || 0) / (notesPerPage || 1))
  );

  const setURLParams = useCallback(
    (page, limit, q) => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (q && q.trim()) params.set("q", q.trim());
      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const fetchNotes = useCallback(
    async (page, limit = notesPerPage, q) => {
      setLoading(true);
      setError("");
      try {
        const data = await getUserNotes({ page, limit, q });

        const { validatedPage, validatedNotesPerPage, validatedNoteTotal } =
          paginationHandler({
            rawPage: data?.page,
            rawLimit: data?.limit,
            rawNoteTotal: data?.total,
          });

        setNotes(data?.notes || []);
        setCurrentPage(validatedPage);
        setNotesPerPage(validatedNotesPerPage);
        setNoteTotal(validatedNoteTotal);
        setURLParams(validatedPage, validatedNotesPerPage, q);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, notesPerPage, searchQuery, setURLParams]
  );

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteUserNote(noteId);
      fetchNotes(currentPage, notesPerPage, searchQuery);
    } catch (err) {
      console.error("Failed to delete the note:", err);
      setError("Failed to delete the note.");
    }
  };

  const handleTogglePublicNote = async (noteId, isPublic) => {
    try {
      const data = await togglePublicNote(noteId, isPublic);
      setNotes((notes) =>
        notes.map((note) => (note._id === noteId ? data.note : note))
      );
    } catch (err) {
      console.error("Failed to toggle public note:", err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const queryString = searchQuery.trim();
    if (queryString) fetchNotes(1, notesPerPage, queryString);
  };

  const handleClearFilter = () => {
    setCurrentPage(1);
    setSearchQuery("");
    fetchNotes(1, notesPerPage);
  };

  const handleChangeNotesPerPage = (event) => {
    event.preventDefault();
    const { validatedNotesPerPage } = paginationHandler({
      rawLimit: event.target.value,
    });
    fetchNotes(1, validatedNotesPerPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) fetchNotes(currentPage - 1, notesPerPage, searchQuery);
  };

  const handleNextPage = () => {
    if (currentPage < pageTotal)
      fetchNotes(currentPage + 1, notesPerPage, searchQuery);
  };

  useEffect(() => {
    const { validatedPage, validatedNotesPerPage } = paginationHandler({
      rawPage: searchParams.get("page"),
      rawLimit: searchParams.get("limit"),
    });
    const queryString = searchParams.get("q") || "";

    setCurrentPage(validatedPage);
    setNotesPerPage(validatedNotesPerPage);
    setSearchQuery(queryString);

    fetchNotes(validatedPage, validatedNotesPerPage, queryString);
  }, []);

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="grid gap-2 mb-16">
      <h2 className="font-bold text-2xl text-center">
        Welcome, {user?.fullName || "User"} 👋
      </h2>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div></div>
      <div className="flex items-center justify-between">
        <NoteForm onSuccess={() => fetchNotes()}>
          <Button variant="outline">Create Note</Button>
        </NoteForm>
        <div className="flex items-center gap-2">
          <Button variant="link" onClick={handleClearFilter}>
            ↻ Refresh
          </Button>
          <label>
            Page size:
            <select
              value={notesPerPage}
              onChange={handleChangeNotesPerPage}
              className="ml-2 p-2 border-2 border-black rounded bg-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-10 text-lg">Loading...</div>
      ) : !notes || !notes[0] ? (
        <div className="text-center mt-10 text-lg">There are no notes.</div>
      ) : (
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              isPublic={false}
              note={note}
              handleDeleteNote={handleDeleteNote}
              handleTogglePublicNote={handleTogglePublicNote}
              setNotes={setNotes}
              onSuccess={() => fetchNotes()}
            />
          ))}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-16">
        <Button
          variant="link"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className={`font-bold text-md ${
            currentPage <= 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Prev
        </Button>
        <span className="text-primary font-mono">
          Page {currentPage} of {pageTotal}
        </span>
        <Button
          variant="link"
          onClick={handleNextPage}
          disabled={currentPage >= pageTotal}
          className={`font-bold text-md ${
            currentPage >= pageTotal ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
