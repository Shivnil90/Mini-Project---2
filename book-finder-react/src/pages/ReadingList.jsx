import { Link } from "react-router-dom";
import { useReadingList } from "../context/ReadingListContext";
import BookCard from "../components/BookCard";

export default function ReadingList() {
  const { readingList } = useReadingList();

  return (
    <main className="page-background">
      <div className="container section-padding">
        <div className="page-heading">
          <span className="section-eyebrow">YOUR PERSONAL COLLECTION</span>
          <h1>My Reading <span className="gradient-text">List.</span></h1>
          <p>All your favourite books, collected in one place.</p>
        </div>

        <div className="reading-summary">
          <div className="summary-icon">
            <i className="bi bi-bookmark-heart-fill"></i>
          </div>
          <div>
            <h4>{readingList.length} Saved Books</h4>
            <p>Your personal collection is waiting for you.</p>
          </div>
        </div>

        {readingList.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-journal-bookmark"></i>
            <h3>Your reading list is empty</h3>
            <p>Explore the book collection and save books you would love to read.</p>
            <Link to="/search" className="primary-button">
              Discover Books <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {readingList.map((book) => (
              <div className="col-sm-6 col-lg-3" key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}