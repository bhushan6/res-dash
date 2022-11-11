import React from "react";
import { RestaurantGoogleChart } from "../../../components";
import { useBookmarks } from "../../../contexts";

export const Bookmarks = () => {
  const [bookmarks] = useBookmarks();

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>Bookmarks</h1>
      <div>
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
