import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export const useNote = () => useContext(NoteContext);
