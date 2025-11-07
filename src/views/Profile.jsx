import { useNavigate, useParams } from "react-router-dom";
import { AskForm } from "../components/AskForm";
import { NoteCard } from "../components/NoteCard";
import { useCallback, useEffect, useState } from "react";
import { getPublicNotesByUserId } from "../services/note.service";
import { paginationHandler } from "../utils/paginationHandler";
import { Button } from "../components/ui/button";

export function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [publicNotes, setPublicNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [notesPerPage, setNotesPerPage] = useState(0);
  const [noteTotal, setNoteTotal] = useState(0);
  const pageTotal = Math.max(
    1,
    Math.ceil((noteTotal || 0) / (notesPerPage || 1))
  );

  const fetchPublicNotes = useCallback(
    async (page, limit = notesPerPage) => {
      setLoading(true);
      setError("");
      try {
        const data = await getPublicNotesByUserId(userId, { page, limit });

        const { validatedPage, validatedNotesPerPage, validatedNoteTotal } =
          paginationHandler({
            rawPage: data?.page,
            rawLimit: data?.limit,
            rawNoteTotal: data?.total,
          });

        setProfile(data?.user || []);
        setPublicNotes(data?.notes || []);
        setCurrentPage(validatedPage);
        setNotesPerPage(validatedNotesPerPage);
        setNoteTotal(validatedNoteTotal);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load notes.");
      } finally {
        setLoading(false);
      }
    },
    [userId, currentPage, notesPerPage]
  );

  const handleChangeNotesPerPage = (event) => {
    event.preventDefault();
    const { validatedNotesPerPage } = paginationHandler({
      rawLimit: event.target.value,
    });
    fetchPublicNotes(1, validatedNotesPerPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) fetchPublicNotes(currentPage - 1, notesPerPage);
  };

  const handleNextPage = () => {
    if (currentPage < pageTotal)
      fetchPublicNotes(currentPage + 1, notesPerPage);
  };

  const handleViewNote = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  useEffect(() => {
    fetchPublicNotes();
  }, []);

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="grid gap-2 mb-16">
      <h2 className="font-bold text-2xl text-center">
        {profile?.fullName || "User"}'s Public Profile
      </h2>
      <p className="text-sm text-center">
        Email: {profile?.email || "example@email.com"}
      </p>
      <div className="py-4">
        <AskForm userId={userId} />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Public Notes</h3>
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

      <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : !publicNotes[0] ? (
          <div>No public notes available.</div>
        ) : (
          publicNotes.map((note) => (
            <div
              key={note._id}
              className="grid"
              onClick={() => handleViewNote(note._id)}
            >
              <NoteCard isPublicMode={true} note={note} />
            </div>
          ))
        )}
      </div>
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
