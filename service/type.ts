import axios from "axios";
import { apiUrl } from "../config/config";

export interface TypeDto {
  id: string;
  name: string;
}

export async function fetchTypes(): Promise<TypeDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_types`);
  console.log(response.data);
  return response.data;
}