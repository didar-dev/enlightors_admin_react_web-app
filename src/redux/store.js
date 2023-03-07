import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import articlesReducer from "./articles";
export default configureStore({
  reducer: {
    user: userReducer,
    articles: articlesReducer,
  },
});
