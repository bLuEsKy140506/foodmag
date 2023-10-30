import React, { useState, useCallback } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { PostImage } from "../components/PostImage";
import "./RecipeDetails";
import "./PostCreate.css";

import { FaRegWindowClose } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";

import { addRecipe } from "../store/reducers/recipes";

export default function PostCreate() {
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [level, setLevel] = useState("Easy");
  const [preptime, setPreptime] = useState("");
  const [yields, setYields] = useState("");

  const [ingredientsArray, setIngredientsArray] = useState([
    { name: "", quantity: "" },
  ]);
  const [directionArray, setDirectionArray] = useState([""]);

  const dispatch = useDispatch();

  //id generator copied from react router tutorial
  let id = Math.random().toString(36).substring(2, 9);

  const handleImageSuccess = (imageUrl) => {
    setUrl(imageUrl);
  };

  let handleChangeIng = (i, e) => {
    let newIngredientValues = [...ingredientsArray];
    newIngredientValues[i][e.target.name] = e.target.value;
    setIngredientsArray(newIngredientValues);
  };

  let addFormFieldsIng = () => {
    setIngredientsArray([...ingredientsArray, { name: "", quantity: "" }]);
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

  //buttons function to clickable from unclickable
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    let datetime = new Date();
    datetime = moment(datetime).format("YYYY-MM-DD");

    dispatch(
      addRecipe({
        id: id,
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
    alert("This recipe has been ADDED📝");
  });

  return (
    <>
      <div className="single-blog">
        <Link to="/" className="link-back">
          {"< "}Recipes
        </Link>

        <div className="flex-row newpost-container">
          <h2 className="n-label">Post new recipe</h2>
          <div className="new-detail flex-row">
            <div className="add-portion">
              <h2>Add New Recipe</h2>
              <form onSubmit={handleSubmit}>
                <FormGroup className="form-format">
                  <div className="separator-box separator-box-column">
                    <h3>Fill-up the information here</h3>
                    <TextField
                      label="Title"
                      name="title"
                      required
                      margin="dense"
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                      label="Author"
                      name="author"
                      required
                      margin="dense"
                      onChange={(event) => setAuthor(event.target.value)}
                    />

                    <TextField
                      label="Text"
                      multiline
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
                        required
                        margin="normal"
                        onChange={(event) => setPreptime(event.target.value)}
                      />
                      <TextField
                        label="Yield"
                        name="Yield"
                        required
                        margin="normal"
                        onChange={(event) => setYields(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="separator-box ingredient-dishimage">
                    <div className="add-ingredient">
                      <h3>Fill-up the ingredients🍅 here</h3>
                      {ingredientsArray.map((element, index) => (
                        <div className="form-inline " key={index}>
                          <TextField
                            label={`Ingredient-${index + 1}-quantity`}
                            name="quantity"
                            required
                            margin="normal"
                            onChange={(e) => handleChangeIng(index, e)}
                          />
                          <TextField
                            className="ingredient-name"
                            label={`Ingredient-${index + 1}-name`}
                            name="name"
                            required
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
                      <div className="form-inline " key={index}>
                        <TextField
                          label={`Direction-${index + 1}`}
                          name="direction"
                          required
                          margin="dense"
                          multiline
                          className="form-inline-oneline"
                          onChange={(e) => handleChangeDirec(index, e)}
                        />
                        {index ? (
                          <FaRegWindowClose
                            size={30}
                            className="item-cross"
                            onClick={() => removeFormFieldsDirec(index)}
                          />
                        ) : null}
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

                  <div className="button-section"></div>
                  <Button variant="contained" type="submit">
                    Create
                  </Button>
                  <br />
                </FormGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
