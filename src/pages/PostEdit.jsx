import React, { useState, useCallback } from "react";
import moment from "moment";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostImage } from "../components/PostImage";
import "./RecipeDetails";
import "./PostCreate.css";
import "./PostEdit.css";

import { FaRegWindowClose } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";

import { updateRecipe } from "../store/reducers/recipes";

export default function PostEdit() {
  const recipeID = useLoaderData();
  const [url, setUrl] = useState(recipeID.imageUrl);
  const [author, setAuthor] = useState(recipeID.author);
  const [title, setTitle] = useState(recipeID.title);
  const [text, setText] = useState(recipeID.text);
  const [level, setLevel] = useState(recipeID.level);
  const [preptime, setPreptime] = useState(recipeID.prepTime);
  const [yields, setYields] = useState(recipeID.yield);

  const [ingredientsArray, setIngredientsArray] = useState(recipeID.ingredient);
  const [directionArray, setDirectionArray] = useState(recipeID.direction);
  const dispatch = useDispatch();

  //id generator copied from react router tutorial
  console.log(ingredientsArray);
  const handleImageSuccess = (imageUrl) => {
    setUrl(imageUrl);
  };

  let handleChangeIng = (i, e) => {
    let newIngredientValues = [...ingredientsArray];
    newIngredientValues[i] = e.target.value;
    setIngredientsArray(newIngredientValues);
  };

  let addFormFieldsIng = () => {
    setIngredientsArray([...ingredientsArray, ""]);
    console.log(ingredientsArray);
  };

  let removeFormFieldsIng = (i) => {
    let newIngredientValues = [...ingredientsArray];
    newIngredientValues.splice(i, 1);
    setIngredientsArray(newIngredientValues);
  };

  let handleChangeDirec = (i, e) => {
    let newDirectionValues = [...directionArray];
    newDirectionValues[i] = e.target.value;
    setDirectionArray(newDirectionValues);
  };

  let addFormFieldsDirec = () => {
    setDirectionArray([...directionArray, ""]);
    console.log(directionArray);
  };

  let removeFormFieldsDirec = (i) => {
    let newDirectionValues = [...directionArray];
    newDirectionValues.splice(i, 1);
    setDirectionArray(newDirectionValues);
  };

  const handleChangeCategory = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    let datetime = new Date();
    datetime = moment(datetime).format("YYYY-MM-DD");

    dispatch(
      updateRecipe({
        id: recipeID.id,
        title: title,
        text: text,
        author: author,
        level: level,
        prepTime: preptime,
        yield: yields,
        time: datetime,
        ingredient: ingredientsArray,
        direction: directionArray,
        imageUrl: url,
      })
    );

    alert("This recipe has been EDITED✍️");
  });

  return (
    <>
      <div className="single-blog">
        <Link to="/" className="link-back">
          {"< "}Recipes
        </Link>

        <div className="flex-row newpost-container">
          <h2 className="n-label">Modify information this recipe</h2>
          <div className="new-detail flex-row">
            <div className="add-portion">
              <form onSubmit={handleSubmit}>
                <FormGroup className="form-format">
                  <div className="separator-box separator-box-column">
                    <h3>Fill-up the information here</h3>
                    <TextField
                      label="Title"
                      name="title"
                      value={title}
                      required
                      margin="dense"
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                      label="Author"
                      name="author"
                      value={author}
                      required
                      margin="dense"
                      onChange={(event) => setAuthor(event.target.value)}
                    />

                    <TextField
                      label="Text"
                      // multiline
                      minRows={3}
                      value={text}
                      // minRows={2}
                      name="text"
                      required
                      margin="normal"
                      onChange={(event) => setText(event.target.value)}
                    />
                    <div className="description-section-1">
                      <FormControl
                        sx={{ m: 1, minWidth: 80 }}
                        className="select-format"
                      >
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Level - Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={level}
                          onChange={handleChangeCategory}
                          autoWidth
                          label="Level-Category"
                          style={{
                            fontSize: "1.5rem",
                          }}
                        >
                          <MenuItem value={"Easy"}>Easy</MenuItem>
                          <MenuItem value={"Medium"}>Medium</MenuItem>
                          <MenuItem value={"Hard"}>Hard</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Preparation time"
                        name="Preparation time"
                        value={preptime}
                        required
                        margin="normal"
                        onChange={(event) => setPreptime(event.target.value)}
                      />
                      <TextField
                        label="Yield"
                        name="Yield"
                        value={yields}
                        required
                        margin="normal"
                        onChange={(event) => setYields(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="separator-box ingredient-dishimage">
                    <div className="add-ingredient">
                      <h3>Fill-up the ingredients🍅 here</h3>
                      <br />
                      {ingredientsArray.map((element, index) => (
                        <div
                          className="form-inline"
                          key={`${element}-${index}-ings`}
                        >
                          <TextField
                            label={`Ingredient-${index + 1}-quantity`}
                            name="quantity"
                            required
                            value={element.quantity}
                            margin="normal"
                            onChange={(e) => handleChangeIng(index, e)}
                          />
                          <TextField
                            className="ingredient-name"
                            label={`Ingredient-${index + 1}-name`}
                            name="name"
                            required
                            value={element.name}
                            margin="normal"
                            onChange={(e) => handleChangeIng(index, e)}
                          />

                          <FaRegWindowClose
                            size={30}
                            className="item-cross"
                            onClick={() => removeFormFieldsIng(index)}
                          />
                        </div>
                      ))}
                      <div className="button-color-modify">
                        <Button
                          variant="contained"
                          onClick={() => addFormFieldsIng()}
                        >
                          Add new ingredient
                        </Button>
                      </div>
                    </div>
                    <div className="recipe-image">
                      <figure className="add-image-background">
                        {url === "" ? (
                          <PostImage addImageSuccessful={handleImageSuccess} />
                        ) : (
                          <img
                            src={url}
                            alt={`image of ${title}`}
                            className="image-preview"
                          />
                        )}
                      </figure>
                      <FaRegWindowClose
                        size={30}
                        className="item-cross"
                        onClick={() => setUrl("")}
                      />
                    </div>
                  </div>
                  <div className="separator-box">
                    <h3>Fill-up the directions🧑‍🍳 here</h3>
                    {directionArray.map((element, index) => (
                      <div
                        className="form-inline"
                        key={`${element}-${index}-key`}
                      >
                        <h3>{index + 1}.</h3>
                        <textarea
                          wrap="hard"
                          rows="3"
                          label={`Direction-${index + 1}`}
                          name="direction"
                          required
                          value={element}
                          margin="dense" // multiline minRows={3}
                          className="form-inline-oneline ing-label"
                          onChange={(e) => handleChangeDirec(index, e)}
                        ></textarea>
                        <FaRegWindowClose
                          size={30}
                          className="item-cross"
                          onClick={() => removeFormFieldsDirec(index)}
                        />
                      </div>
                    ))}
                    <div className="button-color-modify">
                      <Button
                        variant="contained"
                        onClick={() => addFormFieldsDirec()}
                      >
                        {" "}
                        Add new direction
                      </Button>
                    </div>
                  </div>

                  <div className="button-section button-format"></div>
                  <Button variant="contained" type="submit">
                    Edit
                  </Button>
                </FormGroup>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const recipeID = async ({ params }) => {
  const { id } = params;
  const res = await fetch("http://localhost:3000/recipes/" + id);
  return res.json();
};
