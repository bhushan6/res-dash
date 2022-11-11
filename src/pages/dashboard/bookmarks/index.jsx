import React from "react";
import { RestaurantGoogleChart } from "../../../components";
import { useBookmarks } from "../../../contexts";

export const Bookmarks = () => {
  const [bookmarks] = useBookmarks();

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Bookmarks</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "2rem",
        }}
      >
        {bookmarks.map((bookmark) => (
          <RestaurantGoogleChart
            key={bookmark.id}
            id={bookmark.id}
            bookmarked={true}
          />
        ))}
      </div>
    </div>
  );
};
