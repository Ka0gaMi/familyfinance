import axios from "axios";
import { apiUrl } from "../config/config";

export interface RecipeDto {
  id: string;
  name: string;
  instructions: string;
  recipeIngredients: RecipeIngredientDto[];
}

export interface RecipeIngredientDto {
  id: string;
  quantity: number;
  unit: string;
  ingredient: IngredientDto;
}

export interface IngredientDto {
  id: string;
  name: string;
  price: number | string;
}

export async function fetchRecipes(): Promise<RecipeDto[]> {
  console.log(apiUrl)
  const response = await axios.get(`${apiUrl}/recipes/get_recipes`);
  return response.data;
}