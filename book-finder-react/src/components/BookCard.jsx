import { Link } from "react-router-dom";
import { useReadingList } from "../context/ReadingListContext";

export default function BookCard({ book }) {
  const { addBook, removeBook, isSaved } = useReadingList();
  const saved = isSaved(book.id);

  const cover = book.formats?.["image/jpeg"];
  const author = book.authors?.map((a) => a.name).join(", ");

  const handleSave = () => {
    if (saved) {
      removeBook(book.id);
    } else {
      addBook(book);
    }
  };

  return (
    <article className="book-card">
      <div className="book-cover-wrap">
        {cover ? (
          <img
            src={cover}
            alt={`Cover of ${book.title}`}
            className="book-cover"
            loading="lazy"
          />
        ) : (
          <div className="book-cover-placeholder">
            <i className="bi bi-book"></i>
            <span>No cover available</span>
          </div>
        )}

        <button
          className={`save-button ${saved ? "saved" : ""}`}
          onClick={handleSave}
          aria-label={saved ? "Remove from reading list" : "Save to reading list"}
          title={saved ? "Remove from reading list" : "Save book"}
        >
          <i className={`bi ${saved ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>

      <div className="book-card-content">
        <span className="book-category">
          {book.subjects?.[0]?.split(" -- ")[0] || "Classic Literature"}
        </span>

        <h5>{book.title}</h5>

        <p className="book-author">
          {author || "Unknown author"}
        </p>

        <div className="book-card-bottom">
          <span className="download-count">
            <i className="bi bi-download"></i> {book.download_count || 0}
          </span>

          <Link
  to={`/book/${book.id}`}
  state={{ book }}
  className="view-book-link"
>
            View Details <i className="bi bi-arrow-up-right"></i>
          </Link>
        </div>
      </div>
    </article>
  );
}