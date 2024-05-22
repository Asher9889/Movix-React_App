import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </Provider>
);
