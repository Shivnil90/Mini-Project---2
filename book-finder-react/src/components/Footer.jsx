import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-4">
        <div className="row align-items-center gy-3">
          <div className="col-md-6">
            <h5 className="text-white fw-bold mb-1">
              <i className="bi bi-book-half me-2"></i>
              BookVerse
            </h5>
            <p className="mb-0">
              Discover stories. Explore knowledge. Build your reading list.
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/search" className="footer-link">Explore</Link>
            <Link to="/reading-list" className="footer-link">Reading List</Link>
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} BookVerse. Book data provided by Gutendex.
        </p>
      </div>
    </footer>
  );
}