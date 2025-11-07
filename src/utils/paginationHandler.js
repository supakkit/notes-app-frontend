const defaultPage = 1;
const defaultNotesPerPage = 10;

export const paginationHandler = ({
  rawPage,
  rawLimit,
  rawNoteTotal,
}) => {
  const validatedPage = Math.max(1, parseInt(rawPage || String(defaultPage), 10));
  const validatedNotesPerPage = parseInt(rawLimit, 10) || defaultNotesPerPage;
  const validatedNoteTotal = parseInt(rawNoteTotal, 10) || 1;

  return { validatedPage, validatedNotesPerPage, validatedNoteTotal };
};
