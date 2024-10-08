import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { extendedApiSlice } from "./features/posts/postsSlice.js";
import { usersApiSlice } from "./features/users/usersSlice.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
