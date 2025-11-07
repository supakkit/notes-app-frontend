import { useState } from "react";
import { NoteContext } from "./NoteContext";

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
