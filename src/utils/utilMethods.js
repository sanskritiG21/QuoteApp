export const getTruncatedText = (text) => {
  return text?.length > 100 ? text.slice(0, 100) + "..." : text;
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
