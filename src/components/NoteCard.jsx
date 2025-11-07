import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { NoteForm } from "./NoteForm";

export function NoteCard({
  isPublicMode = false,
  note,
  handleDeleteNote,
  onSuccess,
  handleTogglePublicNote,
  setNotes,
}) {
  const navigate = useNavigate();

  const createdAt = new Date(note.createdAt).toLocaleDateString();

  const handleViewDetails = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <Card className="max-w-xs flex flex-col justify-between" >
      <CardContent className="grid gap-2">
        {note.isPinned && !isPublicMode ? (
          <p className="font-bold text-sm">📌 Pinned</p>
        ) : null}
        <CardTitle className="font-bold line-clamp-2 text-lg/6">
          {note.title}
        </CardTitle>
        <CardDescription className="line-clamp-4 text-pretty">
          {note.content}
        </CardDescription>
        <div className="flex gap-1 flex-wrap">
          {note.tags.map((tag, index) => (
            <Badge key={index} className="bg-blue-200 text-blue-600">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {isPublicMode ? null : (
        <CardFooter>
          <CardDescription className="w-full flex justify-between items-end gap-2 text-xs">
            <p className="mr-2">Created on: {createdAt}</p>
            <button
              onClick={() => handleViewDetails(note._id)}
              className="block text-blue-500 text-wrap underline-offset-4 hover:underline"
            >
              View
            </button>
            <NoteForm note={note} setNotes={setNotes} onSuccess={onSuccess}>
              <button className="block text-green-500 underline-offset-4 hover:underline">
                Edit
              </button>
            </NoteForm>
            <button
              onClick={() => handleDeleteNote(note._id)}
              className="block text-red-500 underline-offset-4 hover:underline"
            >
              Delete
            </button>
            <button
              onClick={() => handleTogglePublicNote(note._id, !note.isPublic)}
              className="block text-yellow-500 underline-offset-4 hover:underline"
            >
              {note.isPublic ? "Unpublish" : "Publish"}
            </button>
          </CardDescription>
        </CardFooter>
      )}
    </Card>
  );
}
