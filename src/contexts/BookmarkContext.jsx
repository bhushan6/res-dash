import React, { createContext, useContext, useState } from "react";

const BookmarkCTX = createContext(null);

export const BookmarkContext = ({ children }) => {
  const bookmarkState = useState([]);

  return (
    <BookmarkCTX.Provider value={bookmarkState}>
      {children}
    </BookmarkCTX.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkCTX);
