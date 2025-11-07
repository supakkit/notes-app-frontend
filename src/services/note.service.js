import { paginationHandler } from "../utils/paginationHandler";
import api from "./api";

export const getUserNotes = async ({
  page: rawPage,
  limit: rawLimit,
  q,
} = {}) => {
  const { validatedPage: nextPage, validatedNotesPerPage } = paginationHandler({
    rawPage,
    rawLimit,
  });
  const params = { page: nextPage, limit: validatedNotesPerPage };
  if (q && String(q).trim()) params.q = String(q).trim();

  const response = await api.get("/notes", { params });
  return response.data;
};

export const deleteUserNote = async (noteId) => {
  const response = await api.delete(`notes/${noteId}`);
  return response.data;
}

export const createUserNote = async (note) => {
  const response = await api.post("/notes", note);
  return response.data;
}

export const updateUserNote = async (noteId, note) => {
  const response = await api.patch(`/notes/${noteId}`, note);
  return response.data;
}

export const togglePublicNote = async (noteId, isPublic) => {
  const response = await api.patch(`/notes/${noteId}`, { isPublic });
  return response.data;
}

export const getUserNoteByNoteId = async (noteId) => {
  const response = await api.get(`/notes/${noteId}`);
  return response.data;
}

export const getPublicNoteByNoteId = async (noteId) => {
  const response = await api.get(`/public-notes/${noteId}`);
  return response.data;
}

export const getPublicNotesByUserId = async (userId) => {
  const response = await api.get(`/public-notes/user/${userId}`);
  return response.data;
}

export const answerQuestion = async (userId, question) => {
  const response = await api.post(`/answer-question/${userId}`, { question });
  return response.data;
}