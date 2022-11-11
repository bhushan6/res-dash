import React from "react";
import { AddedRestaurantsCotext } from "./AddedRestaurantsContext";
import { AuthContext } from "./AuthContext";
import { BookmarkContext } from "./BookmarkContext";
import { ListOfResContext } from "./ListOfResContext";

export const Context = ({ children }) => {
  return (
    <>
      <AuthContext>
        <AddedRestaurantsCotext>
          <ListOfResContext>
            <BookmarkContext>{children}</BookmarkContext>
          </ListOfResContext>
        </AddedRestaurantsCotext>
      </AuthContext>
    </>
  );
};
