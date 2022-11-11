import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  RestaurantGoogleChart,
  RestaurantItem,
} from "../../../components";
import { useRestaurantList, useAddedRestaurant } from "../../../contexts";
import { Axios, searchIcon, closeIcon } from "../../../utils/helpers";

export const Home = () => {
  const [listOfRes, setListOfRes] = useRestaurantList();

  const [searchText, setSearchText] = useState("");

  const [addedRestaurants] = useAddedRestaurant();

  const autoComplete = ({ fields: { Name } }) => {
    if (searchText === "") {
      return false;
    }

    return Name?.toLowerCase().includes(searchText.toLowerCase());
  };

  const filtredList = Object.values(listOfRes).filter(autoComplete);

  useEffect(() => {
    const fetchRes = async () => {
      try {
        const {
          data: { records },
        } = await Axios("restaurants?maxRecords=30&view=Grid%20view");

        const dummy = {};
        records.forEach((record) => {
          dummy[record.id] = record;
        });
        setListOfRes(dummy);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRes();
  }, []);

  const t = useRef();

  const searchRes = (e) => {
    t.current && clearTimeout(t);

    t.current = setTimeout(() => {
      setSearchText(e.target.value);
    }, 500);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0.5rem 0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
        }}
      >
        <Input
          onChange={searchRes}
          style={{ paddingRight: "2rem", background: "white" }}
        />
        {
          <span
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-40%)",
              cursor: "pointer",
            }}
            onClick={() => setSearchText("")}
          >
            {filtredList.length < 1 ? searchIcon : closeIcon}
          </span>
        }
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "100%",
            borderWidth: filtredList.length < 1 ? null : "0px 1px 1px 1px",
            borderStyle: filtredList.length < 1 ? null : "solid",
            borderColor: filtredList.length < 1 ? null : "rgba(0, 0, 0, 0.2)",
            transform: "translateY(-3px)",
            borderRadius: "0px 0px var(--border-radius) var(--border-radius)",
            maxHeight: "40vh",
            overflowY: "auto",
            background: "white",
          }}
        >
          {filtredList.map((item) => (
            <RestaurantItem id={item.id} key={item.id} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "2rem",
        }}
      >
        {addedRestaurants &&
          addedRestaurants.map((res) => (
            <RestaurantGoogleChart key={res.id} id={res.id} />
          ))}
      </div>
    </div>
  );
};
