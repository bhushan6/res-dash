import React, { createContext, useContext, useState } from "react";

const RestaurantContext = createContext(null);

export const AddedRestaurantsCotext = ({ children }) => {
  const restaurantState = useState([]);

  return (
    <RestaurantContext.Provider value={restaurantState}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useAddedRestaurant = () => useContext(RestaurantContext);
