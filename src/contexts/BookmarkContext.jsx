import React, { createContext, useContext, useState, useEffect } from "react";

const BookmarkCTX = createContext(null);

export const BookmarkContext = ({ children }) => {
  const bookmarkState = useState(
    JSON.parse(sessionStorage.getItem("BookmarkedRestaurants")) || []
  );

  useEffect(() => {
    sessionStorage["BookmarkedRestaurants"] = JSON.stringify(bookmarkState[0]);
  }, [bookmarkState]);

  return (
    <BookmarkCTX.Provider value={bookmarkState}>
      {children}
    </BookmarkCTX.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkCTX);
