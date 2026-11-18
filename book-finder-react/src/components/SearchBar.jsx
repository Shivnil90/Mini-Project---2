import { useRef } from "react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputRef.current.value.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <i className="bi bi-search search-icon"></i>

      <input
        ref={inputRef}
        type="search"
        className="search-input"
        placeholder="Search by book title or author..."
        defaultValue={initialValue}
        aria-label="Search books"
      />

      <button className="search-button" type="submit">
        Search Books
      </button>
    </form>
  );
}