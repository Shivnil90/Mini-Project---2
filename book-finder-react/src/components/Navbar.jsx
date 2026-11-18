import { Link, NavLink } from "react-router-dom";
import { useReadingList } from "../context/ReadingListContext";

export default function Navbar() {
  const { readingList } = useReadingList();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="brand-icon">B</span> BookVerse
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/search">
              Explore Books
            </NavLink>

            <NavLink className="nav-link" to="/reading-list">
              My Reading List
              <span className="reading-count">
                {readingList.length}
              </span>
            </NavLink>

            <Link className="nav-cta" to="/search">
              Discover Books <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}