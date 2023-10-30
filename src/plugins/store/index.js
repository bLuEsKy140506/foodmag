import { configureStore } from "@reduxjs/toolkit";
import recipeList from "./reducers/recipes";

export const store = configureStore({
  reducer: {
    recipes: recipeList,
  },
});
