import React, { memo } from "react";
import { useAddedRestaurant, useRestaurantList } from "../contexts";
import { addIcon } from "../utils/helpers";

export const RestaurantItem = memo(({ id }) => {
  const [addedRestaurants, setAddedRestaurant] = useAddedRestaurant();
  const [listOfRes] = useRestaurantList();

  const item = listOfRes[id];

  const isAdded = addedRestaurants.filter((res) => res.id === item.id);

  const addRestaurant = () =>
    !isAdded[0] && setAddedRestaurant((prevState) => [...prevState, item]);

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
          cursor: "pointer",
        }}
        onClick={addRestaurant}
      >
        {addIcon}
      </span>
    </div>
  );
});
