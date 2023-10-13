import React from "react";
import styles from "./RecipeItem.module.css";
import { RecipeDto } from "../../../../../service/recipe";
import { receiveMessageOnPort } from "worker_threads";

interface RecipeItemProps {
  recipe: RecipeDto;
}

export default function RecipeItem({ recipe }: RecipeItemProps) {
  const [recipeInstructions, setRecipeInstructions] = React.useState([] as string[]);

  React.useEffect(() => {
    const recipeInstructions = recipe.instructions.split(/\s(?=\d+\.)/);
    setRecipeInstructions(recipeInstructions);
  }, [recipe]);

  console.log(recipeInstructions);

  return (
    <>
      <div className={styles.RecipeItemContainer}>
        <div className={styles.RecipeItem}>
          <h1>{recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}</h1>
          <h2>Recepto ingredientai</h2>
          <ul>
            {recipe.recipeIngredients.map((recipeIngredient) => {
              return (
                <li key={recipeIngredient.ingredient.id} className={styles.RecipeItem}>
                  {recipeIngredient.ingredient.name.charAt(0).toUpperCase() + recipeIngredient.ingredient.name.slice(1)}
                  <span className={styles.RecipeItemQuantity}>
                    {recipeIngredient.quantity}{recipeIngredient.unit}
                  </span>
                  <span className={styles.RecipeItemPrice}>
                    {Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR' }).format(Number(recipeIngredient.ingredient.price))}
                  </span>
                </li>
              )
            })}
          </ul>
          <h2>Recepto instrukcijos</h2>
          <ol className={styles.RecipeInstructionsList}>
            {recipeInstructions.map((instruction, index) => {
              return (
                <li key={index}>{instruction}</li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}