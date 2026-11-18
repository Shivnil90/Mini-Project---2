
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { fetchBookById } from "../services/bookApi";
import { useReadingList } from "../context/ReadingListContext";
import Loading from "../components/Loading";

export default function BookDetails() {
  const { id } = useParams();
  const location = useLocation();

  const initialBook =
    location.state?.book?.id === Number(id)
      ? location.state.book
      : null;

  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(!initialBook);
  const [error, setError] = useState("");

  const { addBook, removeBook, isSaved } = useReadingList();

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let active = true;

    async function loadBook() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchBookById(id, controller.signal);

        if (active) setBook(data);
      } catch (err) {
        if (active && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadBook();

    return () => {
      active = false;
      controller.abort();
    };
  }, [id, initialBook]);

  if (loading) return <Loading />;

  if (error || !book) {
    return (
      <main className="page-background">
        <div className="container section-padding">
          <div className="empty-state">
            <i className="bi bi-exclamation-circle"></i>
            <h3>Unable to load book details</h3>
            <p>{error || "Book not found."}</p>
            <Link to="/search" className="primary-button">
              Back to Books
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const cover = book.formats?.["image/jpeg"];
  const author =
    book.authors?.map((item) => item.name).join(", ") ||
    "Unknown author";

  const saved = isSaved(book.id);

  const readingLink =
    book.formats?.["text/html"] ||
    book.formats?.["application/epub+zip"] ||
    book.formats?.["text/plain"];

  return (
    <main className="page-background">
      <div className="container section-padding">
        <Link to="/search" className="back-link">
          <i className="bi bi-arrow-left"></i> Back to Books
        </Link>

        <div className="details-card">
          <div className="row g-5 align-items-center">
            <div className="col-md-4 text-center">
              {cover ? (
                <img
                  src={cover}
                  alt={book.title}
                  className="details-cover"
                />
              ) : (
                <div className="details-placeholder">
                  <i className="bi bi-book"></i>
                </div>
              )}
            </div>

            <div className="col-md-8">
              <span className="section-eyebrow">
                BOOK INFORMATION
              </span>

              <h1 className="details-title">{book.title}</h1>

              <p className="details-author">
                <i className="bi bi-person"></i> {author}
              </p>

              <div className="details-stats">
                <span>
                  <i className="bi bi-download"></i>{" "}
                  {book.download_count || 0} downloads
                </span>
                <span>Book ID: {book.id}</span>
              </div>

              <h5 className="mt-4">About this book</h5>

              <p className="details-description">
                {book.subjects?.slice(0, 8).join(", ") ||
                  "Explore this book from the Project Gutenberg collection."}
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <button
                  className="primary-button"
                  onClick={() =>
                    saved ? removeBook(book.id) : addBook(book)
                  }
                >
                  <i className={`bi ${saved ? "bi-heart-fill" : "bi-heart"}`}></i>
                  {saved
                    ? "Remove from Reading List"
                    : "Add to Reading List"}
                </button>

                {readingLink && (
                  <a
                    href={readingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="outline-button"
                  >
                    Read Online
                    <i className="bi bi-box-arrow-up-right"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
