import React from "react";
import { AddedRestaurantsCotext } from "./AddedRestaurantsContext";
import { AuthContext } from "./AuthContext";
import { BookmarkContext } from "./BookmarkContext";
import { ListOfResContext } from "./ListOfResContext";
import { NotificationContext } from "./NotificationContext";

export const Context = ({ children }) => {
  return (
    <>
      <AuthContext>
        <NotificationContext>
          <AddedRestaurantsCotext>
            <ListOfResContext>
              <BookmarkContext>{children}</BookmarkContext>
            </ListOfResContext>
          </AddedRestaurantsCotext>
        </NotificationContext>
      </AuthContext>
    </>
  );
};
