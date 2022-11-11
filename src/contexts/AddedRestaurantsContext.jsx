import React, { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext(null);

export const AddedRestaurantsCotext = ({ children }) => {
  const restaurantState = useState(
    JSON.parse(sessionStorage.getItem("AddedRestaurants")) || []
  );

  useEffect(() => {
    sessionStorage["AddedRestaurants"] = JSON.stringify(restaurantState[0]);
  }, [restaurantState]);

  return (
    <RestaurantContext.Provider value={restaurantState}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useAddedRestaurant = () => useContext(RestaurantContext);
