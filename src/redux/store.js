import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import usersReducer from "./users";
import articlesReducer from "./articles";
import clientsReducer from "./clients";
import meetingsReducer from "./meetings";
import logsReducer from "./logs";
export default configureStore({
  reducer: {
    Auth: AuthReducer,
    users: usersReducer,
    articles: articlesReducer,
    clients: clientsReducer,
    meetings: meetingsReducer,
    logs: logsReducer,
  },
});
