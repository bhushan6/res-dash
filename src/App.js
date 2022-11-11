import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Bookmarks, Dashboard, Home, Input, Login } from "./pages";
import { memo, useEffect, useRef, useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import {
//   addIcon,
//   Axios,
//   closeIcon,
//   searchIcon,
//   starIcon,
// } from "./utils/helpers";
// import {
//   useAddedRestaurant,
//   useBookmarks,
//   useRestaurantList,
// } from "./contexts";

// const Iframe = memo(({ name }) => {
//   return (
//     <iframe
//       title={`${name}'s google chart`}
//       width={window.innerWidth / 2}
//       height="350"
//       src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${name}%22%7D`}
//       frameborder="0"
//       allowfullscreen
//     />
//   );
// });

// export const RestaurantGoogleChart = ({ id, bookmarked }) => {
//   const [, setBookmark] = useBookmarks();
//   const [, setAddedRestaurant] = useAddedRestaurant();

//   const [listOfRes] = useRestaurantList();

//   const item = listOfRes[id];

//   const handleBookmarks = () => {
//     if (bookmarked) {
//       setBookmark((currentState) => {
//         const newState = currentState.filter((res) => res.id !== item.id);
//         return newState;
//       });
//     } else {
//       setBookmark((prevState) => [...prevState, item]);

//       setAddedRestaurant((currentState) => {
//         const newState = currentState.filter((res) => res.id !== item.id);
//         return newState;
//       });
//     }
//   };

//   const removeFromList = () => {
//     setAddedRestaurant((currentState) => {
//       const newState = currentState.filter((res) => res.id !== item.id);
//       return newState;
//     });
//   };

//   return (
//     <>
//       <div
//         style={{
//           padding: "0.5rem",
//           borderRadius: "var(--border-radius)",
//           width: "fit-content",
//           border: "1px solid rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <div
//           style={{
//             padding: "0.5rem 0",
//             display: "flex",
//             justifyContent: "end",
//             gap: "15px",
//             alignItems: "center",
//           }}
//         >
//           <span
//             style={{
//               cursor: "pointer",
//             }}
//             onClick={handleBookmarks}
//           >
//             {bookmarked ? starIcon("var(--blue)") : starIcon("var(--gray)")}
//           </span>
//           {!bookmarked && (
//             <span
//               style={{
//                 cursor: "pointer",
//               }}
//               onClick={removeFromList}
//             >
//               {closeIcon}
//             </span>
//           )}
//         </div>
//         <Iframe name={item.fields.Name} />
//       </div>
//     </>
//   );
// };

// const RestaurantItem = memo(({ id }) => {
//   const [addedRestaurants, setAddedRestaurant] = useAddedRestaurant();
//   const [listOfRes] = useRestaurantList();

//   const item = listOfRes[id];

//   const isAdded = addedRestaurants.filter((res) => res.id === item.id);

//   const addRestaurant = () =>
//     !isAdded[0] && setAddedRestaurant((prevState) => [...prevState, item]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         margin: "1rem",
//       }}
//     >
//       <div>{item.fields.Name}</div>
//       <span
//         style={{
//           cursor: "pointer",
//         }}
//         onClick={addRestaurant}
//       >
//         {addIcon}
//       </span>
//     </div>
//   );
// });

const Redirect = () => {
  const navigate = useNavigate();

  navigate("login");

  return <></>;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("login");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="bookmark" element={<Bookmarks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
