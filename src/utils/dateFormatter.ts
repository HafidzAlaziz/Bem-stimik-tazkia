export const formatDateToIndo = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "-";
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // fallback if invalid

    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    return dateStr;
  }
};
