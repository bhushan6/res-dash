import React from "react";
import {
  useBookmarks,
  useAddedRestaurant,
  useRestaurantList,
} from "../contexts";
import { closeIcon, starIcon } from "../utils/helpers";
import { Iframe } from "./Iframe";

export const RestaurantGoogleChart = ({ id, bookmarked }) => {
  const [, setBookmark] = useBookmarks();
  const [, setAddedRestaurant] = useAddedRestaurant();

  const [listOfRes] = useRestaurantList();

  const item = listOfRes[id];

  if (!item) return <></>;

  const handleBookmarks = () => {
    if (bookmarked) {
      setBookmark((currentState) => {
        const newState = currentState.filter((res) => res.id !== item.id);
        return newState;
      });
    } else {
      setBookmark((prevState) => [...prevState, item]);

      setAddedRestaurant((currentState) => {
        const newState = currentState.filter((res) => res.id !== item.id);
        return newState;
      });
    }
  };

  const removeFromList = () => {
    setAddedRestaurant((currentState) => {
      const newState = currentState.filter((res) => res.id !== item.id);
      return newState;
    });
  };

  return (
    <>
      <div
        style={{
          padding: "0.5rem",
          borderRadius: "var(--border-radius)",
          width: "fit-content",
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "15px",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            <h1>{item.fields.Name} </h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={handleBookmarks}
            >
              {bookmarked ? starIcon("var(--blue)") : starIcon("var(--gray)")}
            </span>
            {!bookmarked && (
              <span
                style={{
                  cursor: "pointer",
                }}
                onClick={removeFromList}
              >
                {closeIcon}
              </span>
            )}
          </div>
        </div>
        <Iframe name={item.fields.Name} />
      </div>
    </>
  );
};
