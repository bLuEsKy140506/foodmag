import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { recipesAPI } from "../../api";

// the outside "thunk creator" function
export const fetchRecipes = createAsyncThunk("todos/fetchAll", () =>
  recipesAPI.fetchAll()
);
export const deleteRecipe = createAsyncThunk("todo/delete", (id) => {
  // TODO: return a call  to corresponding API method i.e. recipesAPI.fetchAll()
  recipesAPI.deleteOne(id);
});
export const updateRecipe = createAsyncThunk("todo/update", (id) => {
  // console.log(id);
  recipesAPI.updateOne(id);
  // TODO: return a call  to corresponding API method i.e. recipesAPI.fetchAll()
});
export const addRecipe = createAsyncThunk("todo/add", (todo) => {
  recipesAPI.createOne(todo);
});

const initialState = [];

const todosSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });

    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      if (index !== -1) state.splice(index, 1);
    });

    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.push(action.meta.arg);
    });

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      // console.log(state, action.meta.arg);
      return state.map((data) => {
        if (data.id === action.meta.arg.id) {
          //if match then change the variables based on the user inputs
          return action.meta.arg;
        } else {
          //no change of the object
          return data;
        }
      });
    });
  },
});

export default todosSlice.reducer;
