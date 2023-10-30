import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

import "./RecipeDetails.css";

export default function RecipeDetails() {
  const recipeID = useLoaderData();

  return (
    <>
      <div className="single-blog">
        <Link to="/" className="link-back">
          {"< "}Recipes
        </Link>
      </div>
      <div className="top-container">
        <h2 className="title" key={recipeID.id}>
          {recipeID.title}
        </h2>
        <h3 className="author">{recipeID.author}</h3>
        <div className="first-level-type-1">
          <div className="second-level-type-1">
            <figure className="img-1">
              <img src={recipeID.imageUrl} alt="title-picture" />
            </figure>
            <div className="second-level group-type-1">
              <p className="second-level text-1">{recipeID.text}</p>
              <div className="third-level group-type-1">
                <div className="third-level-item">
                  {" "}
                  <span className="labels">DIFFICULTY: </span>
                  <span className="group-item">{recipeID.level}</span>
                </div>
                <div className="third-level-item">
                  {" "}
                  <span className="labels">PREPTIME: </span>
                  <span className="group-item">{recipeID.prepTime} mins</span>
                </div>
                <div className="third-level-item">
                  {" "}
                  <span className="labels">YIELD: </span>
                  <span className="group-item">{recipeID.yield}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="first-level box-2">
          <h3>Ingredients</h3>
          <div className="second-level box-1">
            {recipeID.ingredient.map((item, index) => (
              <div
                className="second-level arrayitem"
                key={`${index}-${item.name}`}
              >
                <p>
                  <span className="group-item group-item-type-1">
                    {item.quantity}
                  </span>
                  <span className="group-item group-item-type-1">
                    {item.name}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="first-level box-3">
          <h3>Directions:</h3>
          <div className="second-level arrayitem">
            {recipeID.direction.map((item, index) => (
              <p className="array-item-type-1">
                <span className="list-number">{index + 1}. </span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const recipeIDdetails = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:3000/recipes/" + id);
  return res.json();
};
