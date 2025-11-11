// import React, { useState } from "react";

// const FavoritesList = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [input, setInput] = useState("");

//   const addFavorite = () => {
//     if (input && !favorites.includes(input)) {
//       setFavorites([...favorites, input]);
//       setInput("");
//     }
//   };

//   const removeFavorite = (item) => {
//     setFavorites(favorites.filter((favorite) => favorite !== item));
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>My Favorites</h2>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Add a favorite"
//       />
//       <button onClick={addFavorite}>Add</button>
//       <ul>
//         {favorites.map((item, index) => (
//           <li key={index} style={{ margin: "5px 0" }}>
//             {item}{" "}
//             <button onClick={() => removeFavorite(item)} style={{ marginLeft: "10px" }}>
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavoritesList;
