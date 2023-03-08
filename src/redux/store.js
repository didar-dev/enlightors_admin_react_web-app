import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import usersReducer from "./users";
import articlesReducer from "./articles";
export default configureStore({
  reducer: {
    Auth: AuthReducer,
    users: usersReducer,
    articles: articlesReducer,
  },
});
