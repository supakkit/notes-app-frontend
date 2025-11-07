import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createUserNote, updateUserNote } from "../services/note.service";

const defaultNoteForm = {
  title: "",
  content: "",
  tags: [],
  isPinned: false,
  isPublic: false,
};

export function NoteForm({ children, note = null, setNotes, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [noteForm, setNoteForm] = useState(defaultNoteForm);
  const [loading, setLoading] = useState(false);
  const isEdit = !!note;

  const handleNoteFormChange = (e) => {
    // console.log('value:', e.target.value)
    const { name, value, type, checked } = e.target;
    if (name === "tags") {
      setNoteForm({
        ...noteForm,
        [name]: String(value)
          .trim()
          .split(/[,\s]+/),
      });
    } else {
      setNoteForm({
        ...noteForm,
        [name]: type === "checkbox" ? checked : String(value),
      });
    }
  };

  const handleNoteFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const data = await updateUserNote(note._id, noteForm);
        const noteId = note._id;
        setNotes((notes) => 
          Array.isArray(notes)
            ? notes.map((note) => (note._id === noteId ? data.note : note))
            : notes._id === noteId
            ? data.note
            : notes
        );
      } else {
        await createUserNote(noteForm);
        onSuccess();
      }
    } catch (err) {
      console.error("Failed to submit the note:", err);
    } finally {
      setNoteForm(defaultNoteForm);
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setNoteForm({
        title: note.title,
        content: note.content,
        tags: note.tags,
        isPinned: note.isPinned,
        isPublic: note.isPublic,
      });
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit the Note" : "Create a New Note"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit" : "Create"} your note here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form onSubmit={handleNoteFormSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={noteForm.title}
                  onChange={handleNoteFormChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={noteForm.content}
                  onChange={handleNoteFormChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tag"
                  name="tags"
                  value={noteForm.tags.join(", ")}
                  onChange={handleNoteFormChange}
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isPinned"
                  name="isPinned"
                  checked={noteForm.isPinned}
                  onCheckedChange={(checked) =>
                    handleNoteFormChange({
                      target: { name: "isPinned", type: "checkbox", checked },
                    })
                  }
                />
                <Label htmlFor="isPinned">Pin this note</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isPublic"
                  name="isPublic"
                  checked={noteForm.isPublic}
                  onCheckedChange={(checked) =>
                    handleNoteFormChange({
                      target: { name: "isPublic", type: "checkbox", checked },
                    })
                  }
                />
                <Label htmlFor="isPublic">Publish this note</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={loading}
                onClick={handleNoteFormSubmit}
              >
                {loading
                  ? isEdit
                    ? "Updating Note..."
                    : "Adding Note..."
                  : isEdit
                  ? "Update Note"
                  : "Add Note"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
