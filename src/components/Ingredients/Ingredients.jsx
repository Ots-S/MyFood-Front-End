import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import axios from "axios";
import IngredientContainer from "./IngredientContainer";

export default function Ingredients() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([{}]);

  useEffect(() => {
    getIngredients();
  }, []);

  function onChange(event) {
    setIngredient(event.target.value);
  }

  function getIngredients() {
    axios.get("/ingredients").then(response => setIngredients(response.data));
  }

  function saveIngredient(ingredient) {
    const newIngredient = { name: ingredient };
    axios.post("/ingredient", newIngredient).then(() => {
      getIngredients();
    });
  }

  function deleteIngredient(id) {
    axios.delete("/ingredient/" + id).then(() => {
      getIngredients();
    });
  }

  return (
    <Grid container direction="column" alignItems="center">
      <h1>Ajouter un ingrédient</h1>
      <Grid item>
        <TextField
          style={{ width: "20rem" }}
          fullWidth
          label="Entrez le nom d'un ingrédient"
          value={ingredient}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <Box my={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => saveIngredient(ingredient)}
          >
            Ajouter
          </Button>
        </Box>
      </Grid>
      <Grid container justify="center">
        {ingredients && (
          <Grid container justify="center" item xs={6}>
            {ingredients.map((ingredient, i) => (
              <IngredientContainer
                key={i}
                ingredient={ingredient}
                deleteIngredient={deleteIngredient}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}