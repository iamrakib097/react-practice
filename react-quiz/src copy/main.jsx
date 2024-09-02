import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import "./index.css";
import { QuizeProvider } from "./context/Quize.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizeProvider>
      <App />
    </QuizeProvider>
  </StrictMode>
);
