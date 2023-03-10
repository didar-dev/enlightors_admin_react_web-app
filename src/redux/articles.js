import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  articles: [],
};
export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    deleteArticleById: (state, action) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
  },
});
export const { setArticles, deleteArticleById } = articlesSlice.actions;
export default articlesSlice.reducer;
