export const formatDate = (date: Date) => {
  date.toLocaleDateString('es-PE');
}

export const formatDateStr = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('es-PE');
}