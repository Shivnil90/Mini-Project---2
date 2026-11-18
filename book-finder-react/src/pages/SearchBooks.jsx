import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useBooks from "../hooks/useBooks";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";

export default function SearchBooks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const { books, loading, error } = useBooks(searchTerm);

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (value) => {
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <main className="page-background">
      <div className="container section-padding">
        <div className="page-heading text-center">
          <span className="section-eyebrow">THE WORLD OF BOOKS</span>
          <h1>Find your next <span className="gradient-text">great read.</span></h1>
          <p>Search thousands of books by title, author or keyword.</p>
        </div>

        <div className="search-page-box">
          <SearchBar
            onSearch={handleSearch}
            initialValue={searchTerm}
          />
        </div>

        <div className="results-heading">
          <div>
            <h3>{searchTerm ? `Results for "${searchTerm}"` : "Explore Books"}</h3>
            <p>{loading ? "Searching the collection..." : `${books.length} books displayed`}</p>
          </div>
        </div>

        {loading && <Loading />}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && books.length === 0 && (
          <div className="empty-state">
            <i className="bi bi-search"></i>
            <h4>No books found</h4>
            <p>Try another title, author or search term.</p>
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="row g-4">
            {books.map((book) => (
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