import React, { memo } from "react";
import {
  useAddedRestaurant,
  useBookmarks,
  useRestaurantList,
} from "../contexts";
import { addIcon } from "../utils/helpers";

export const RestaurantItem = memo(({ id }) => {
  const [addedRestaurants, setAddedRestaurant] = useAddedRestaurant();
  const [bookmarkedRestaurants] = useBookmarks();
  const [listOfRes] = useRestaurantList();

  const item = listOfRes[id];

  const checkIfAdded = () => {
    const addedFilter = addedRestaurants.filter((res) => res.id === item.id);

    if (addedFilter[0]) return addedFilter[0];

    const bookmarkFilter = bookmarkedRestaurants.filter(
      (res) => res.id === item.id
    );

    return bookmarkFilter[0];
  };

  const isAdded = checkIfAdded();

  const addRestaurant = () =>
    !isAdded && setAddedRestaurant((prevState) => [...prevState, item]);

  const addIconSvg = isAdded ? addIcon("var(--gray)") : addIcon();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem",
      }}
    >
      <div>{item.fields.Name}</div>
      <span
        style={{
          cursor: isAdded ? "not-allowed" : "pointer",
        }}
        onClick={addRestaurant}
      >
        {addIconSvg}
      </span>
    </div>
  );
});
