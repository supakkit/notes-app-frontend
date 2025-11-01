import { useContext } from "react";
import { NoteForm } from "../components/NoteForm";
import { NoteCard } from "../components/NoteCard";
import { Search } from "../components/Search";
import { NoteContext } from "../context/NoteContext";
import { Button } from "../components/ui/button";


export function Dashboard() {
    const { loading, notes } = useContext(NoteContext);
    console.log('notes:', notes)

    return (
        <div className="grid gap-2">
            <h2 className="font-bold text-2xl text-center">Welcome, Supakkit Sitthi 👋</h2>
            <Search />
            <NoteForm isEdit={false}>
                <Button variant="outline">Create Note</Button>
            </NoteForm>
            <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? <div>Loading...</div> :
                !notes || notes.length <= 0 ? <div>There are no notes</div> :
                    notes.map(note => (
                        <NoteCard
                            key={note._id}
                            isPublic={false}
                            note={note}
                        />
                    ))
                }
            </div>
        </div>
    );
}

