import { useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NoteForm } from "../components/NoteForm";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getPublicNoteByNoteId, getUserNoteByNoteId } from "../services/note.service";

export function Notes() {
  const { noteId } = useParams();
  const { user } = useAuth();

  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAuth = !!user;

  useEffect(() => {
    const fetchNote = async (noteId) => {
      try {
        setLoading(true);
        setError('');
        const data = isAuth ?
          await getUserNoteByNoteId(noteId) :
          await getPublicNoteByNoteId(noteId);
        setNote(data.note);
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    }

    fetchNote(noteId);
  }, [noteId, isAuth]);

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (!note) {
    return <div className="text-center mt-10">Note not found.</div>;
  }

  return (
    <div className="grid justify-center">
      <div className="grid gap-3">
        <h2 className="font-bold text-3xl pb-1">{note.title}</h2>
        <p className="text-md">{note.content}</p>
        <div className="flex gap-1 flex-wrap">
          {note.tags.map((tag, index) => (
            <Badge key={index} className="bg-blue-200 text-blue-600 text-sm">
              #{tag}
            </Badge>
          ))}
        </div>
        {note.isPinned ? (
          <p className="font-bold text-sm">📌 Pinned</p>
        ) : null}
        {isAuth ? (
        <NoteForm note={note} setNotes={setNote}>
          <Button className="w-fit mt-4">Edit Note</Button>
        </NoteForm>
        ) : null}
      </div>
    </div>
  );
}
