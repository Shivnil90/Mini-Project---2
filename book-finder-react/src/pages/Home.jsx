import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useBooks from "../hooks/useBooks";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { books, loading, error } = useBooks("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <span className="hero-label">
                <i className="bi bi-stars me-2"></i>
                YOUR NEXT GREAT READ STARTS HERE
              </span>

              <h1>
                Discover your next
                <span className="gradient-text"> favourite story.</span>
              </h1>

              <p className="hero-description">
                Explore thousands of books, discover timeless classics
                and create your own personal reading collection.
              </p>

              <form className="hero-search" onSubmit={handleSearch}>
                <i className="bi bi-search"></i>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search books, authors or topics..."
                  aria-label="Search books"
                />
                <button type="submit">Explore Books</button>
              </form>

              <div className="hero-trust">
                <span><i className="bi bi-check-circle-fill"></i> Free book discovery</span>
                <span><i className="bi bi-check-circle-fill"></i> Personal reading list</span>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-art">
                <div className="hero-orbit orbit-one"></div>
                <div className="hero-orbit orbit-two"></div>

                <div className="hero-book hero-book-one">
                  <i className="bi bi-book-half"></i>
                  <span>Stories</span>
                </div>

                <div className="hero-book hero-book-two">
                  <i className="bi bi-journal-bookmark-fill"></i>
                  <span>Knowledge</span>
                </div>

                <div className="hero-book hero-book-three">
                  <i className="bi bi-stars"></i>
                  <span>Discover</span>
                </div>

                <div className="hero-floating-icon">
                  <i className="bi bi-bookmark-heart-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon purple"><i className="bi bi-search"></i></div>
                <div><h6>Explore Books</h6><p>Discover books from different genres.</p></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon orange"><i className="bi bi-heart"></i></div>
                <div><h6>Save Favourites</h6><p>Keep your favourite books together.</p></div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon green"><i className="bi bi-book"></i></div>
                <div><h6>Read and Learn</h6><p>Find available online reading links.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">HANDPICKED FOR YOU</span>
              <h2>Explore popular books</h2>
              <p>Start discovering your next reading adventure.</p>
            </div>

            <button className="outline-button" onClick={() => navigate("/search")}>
              View All Books <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          {loading && <Loading />}

          {error && <div className="alert alert-warning">{error}</div>}

          {!loading && !error && (
            <div className="row g-4">
              {books.slice(0, 8).map((book) => (
                <div className="col-sm-6 col-lg-3" key={book.id}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="discovery-banner">
        <div className="container">
          <div className="discovery-inner">
            <div>
              <span>YOUR PERSONAL LIBRARY</span>
              <h2>Every great reader has a list.</h2>
              <p>Save books you love and keep your reading inspiration in one place.</p>
            </div>
            <button onClick={() => navigate("/reading-list")}>
              My Reading List <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}