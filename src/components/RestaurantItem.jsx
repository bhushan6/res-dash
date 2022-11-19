import React, { memo } from "react";
import {
  useAddedRestaurant,
  useBookmarks,
  useNotifications,
  useRestaurantList,
} from "../contexts";
import { addIcon, SNACKBAR_TYPES } from "../utils/helpers";

export const RestaurantItem = memo(({ id }) => {
  const [addedRestaurants, setAddedRestaurant] = useAddedRestaurant();
  const [bookmarkedRestaurants] = useBookmarks();
  const [listOfRes] = useRestaurantList();
  const { notify } = useNotifications();

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

  const addRestaurant = () => {
    if (!isAdded) {
      setAddedRestaurant((prevState) => [...prevState, item]);
      notify({
        message: "Restaurant added to the list",
        type: SNACKBAR_TYPES.SUCESS,
      });
    }
  };

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
