import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import initStore from "./redux/store";
import App from "./App";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={initStore.store}>
    <PersistGate loading={null} persistor={initStore.persistor}>

        <App />

    </PersistGate>
  </Provider>
);
