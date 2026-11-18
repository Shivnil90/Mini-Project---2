import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import BookDetails from "./pages/BookDetails";
import ReadingList from "./pages/ReadingList";

import { ReadingListProvider } from "./context/ReadingListContext";

function NotFound() {
  return (
    <div className="container section-padding text-center">
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>The page you are looking for does not exist.</p>
      <a href="/" className="primary-button">Return Home</a>
    </div>
  );
}

export default function App() {
  return (
    <ReadingListProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchBooks />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/reading-list" element={<ReadingList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </ReadingListProvider>
  );
}