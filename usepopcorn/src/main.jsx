import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./StartRating";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} />
    <StarRating maxRating={10} size={24} color={"red"} className="test" /> */}
  </React.StrictMode>
);
