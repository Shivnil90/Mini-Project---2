
const API_URL = "/api/books/";

export async function fetchBooks(search = "", signal) {
  const url = search
    ? `${API_URL}?search=${encodeURIComponent(search)}`
    : API_URL;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Books API error: ${response.status}`);
  }

  return (await response.json()).results || [];
}

export async function fetchBookById(id, signal) {
  const response = await fetch(`${API_URL}${id}/`, { signal });

  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    throw new Error(`Book API error: ${response.status}`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error(
      "The book API returned HTML instead of JSON. Check the Vite proxy configuration."
    );
  }

  return response.json();
}
