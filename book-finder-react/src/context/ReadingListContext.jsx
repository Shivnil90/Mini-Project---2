import { createContext, useContext, useEffect, useState } from "react";

const ReadingListContext = createContext();

export function ReadingListProvider({ children }) {
  const [readingList, setReadingList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("readingList")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  const addBook = (book) => {
    setReadingList((current) => {
      if (current.some((item) => item.id === book.id)) {
        return current;
      }
      return [...current, book];
    });
  };

  const removeBook = (id) => {
    setReadingList((current) =>
      current.filter((book) => book.id !== id)
    );
  };

  const isSaved = (id) =>
    readingList.some((book) => book.id === id);

  return (
    <ReadingListContext.Provider
      value={{ readingList, addBook, removeBook, isSaved }}
    >
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  return useContext(ReadingListContext);
}