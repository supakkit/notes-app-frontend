import { useEffect, useState } from "react";
import { NoteContext } from "./NoteContext";
import api from "../api/userService";


export function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createNoteForm, setCreateNoteForm] = useState({ title: "", content: "", tags: [] });
    // const [editNoteId, setEditNoteId] = useState(null);
    const [editNoteForm, setEditNoteForm] = useState({ title: "", content: "", tags: [] });

    const defaultForm = { title: "", content: "", tags: [] };
    
    const NOTES_ENDPOINT = '/notes';

    const fetchNotes = async () => {
        setLoading(true);

        try {
            const response = await api.get(NOTES_ENDPOINT);
            const notes = response.data.notes;
            setNotes(Array.isArray(notes) ? notes : []);
            // console.log(notes);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleCreateFormChange = (e) => {
        // console.log('value:', e.target.value)
        if (e.target.name === 'tags') {
            setCreateNoteForm({
                ...createNoteForm,
                [e.target.name]: String(e.target.value).trim().split(/[,\s]+/),
            });  
        } else {
            setCreateNoteForm({
                ...createNoteForm,
                [e.target.name]: String(e.target.value),
            });
        }
    };

    const handleCreateFormSave = async () => {
        console.log('handleSave:', createNoteForm);
        try {
            await api.post(NOTES_ENDPOINT, createNoteForm);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
        setCreateNoteForm(defaultForm);
    };

    const handleDeleteNote = async (noteId) => {
        if (!window.confirm("Delete this note?")) return;
        try {
            await api.delete(`${NOTES_ENDPOINT}/${noteId}`);
            setNotes(notes.filter(note => note._id !== noteId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditNote = (note) => {
        // setEditNoteId(note._id);
        setEditNoteForm({
            title: note.title,
            content: note.content,
            tags: note.tags.join(', ')
        });
    };

    const handleEditNoteFormChange = (e) => {
        // console.log('value:', e.target.value)
        if (e.target.name === 'tags') {
            setEditNoteForm({
                ...editNoteForm,
                [e.target.name]: String(e.target.value).trim().split(/[,\s]+/),
            });  
        } else {
            setEditNoteForm({
                ...editNoteForm,
                [e.target.name]: String(e.target.value),
            });
        }
    };

    const handleEditNoteFormSave = async (noteId) => {
        // console.log('handleSave:', editNoteForm);
        try {
            await api.put(`${NOTES_ENDPOINT}/${noteId}`, editNoteForm);
            fetchNotes();
        } catch (err) {
            console.error("Error updating note:", err);
        }
        setCreateNoteForm(defaultForm);
    };




    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <NoteContext.Provider
            value={{
                loading, 
                notes,
                createNoteForm,
                handleCreateFormChange, 
                handleCreateFormSave, 
                handleDeleteNote,
                handleEditNote,
                editNoteForm,
                handleEditNoteFormChange,
                handleEditNoteFormSave,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
}