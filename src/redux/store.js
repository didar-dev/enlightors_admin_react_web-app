import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Auth";
import articlesReducer from "./articles";
export default configureStore({
  reducer: {
    Auth: userReducer,
    articles: articlesReducer,
  },
});
