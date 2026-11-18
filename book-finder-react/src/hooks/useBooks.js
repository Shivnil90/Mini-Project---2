
import { useEffect, useState } from "react";
import { fetchBooks } from "../services/bookApi";

export default function useBooks(searchTerm = "") {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadBooks() {
      setLoading(true);
      setError("");
      setBooks([]);

      try {
        const results = await fetchBooks(
          searchTerm,
          controller.signal
        );

        if (active) {
          setBooks(results);
        }
      } catch (err) {
        if (active && err.name !== "AbortError") {
          setError(
            err.message || "Unable to load books. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      active = false;
      controller.abort();
    };
  }, [searchTerm]);

  return { books, loading, error };
}
