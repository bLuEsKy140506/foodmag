import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RouteLayout from "./layouts/RouteLayout";
import PostCreate from "./pages/PostCreate";
import PostEdit, { recipeID } from "./pages/PostEdit";
import RecipeList from "./pages/RecipeList";
import RecipeDetails, { recipeIDdetails } from "./pages/RecipeDetails";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouteLayout />}>
      <Route index element={<RecipeList />} />

      <Route
        path="recipes/:id"
        element={<RecipeDetails />}
        loader={recipeIDdetails}
      />

      <Route path="recipes/post-new" element={<PostCreate />} />
      <Route
        path="recipes/post-edit/:id"
        element={<PostEdit />}
        loader={recipeID}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
