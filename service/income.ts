import axios from "axios";
import { apiUrl } from "../config/config";

export interface IncomeDto {
  id: string;
  date: string;
  name: string;
  amount: number;
  expectedDay: number;
  isGot: boolean;
  notes: string;
}

export async function getIncomeByDate(date: string) {
  const response = await axios.get(`${apiUrl}/finance/get_income?date=${date}`);
  return response.data;
}

export async function addIncome(income: IncomeDto) {
  const response = await axios.post(`${apiUrl}/finance/add_income`, income);
  return response.data;
}

export async function updateIncome(income: IncomeDto) {
  const response = await axios.put(`${apiUrl}/finance/update_income`, income);
  return response.data;
}

export async function deleteIncome(id: string) {
  const response = await axios.delete(`${apiUrl}/finance/delete_income?id=${id}`);
  return response.data;
}

function uuid() {
  return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, (c: string) =>
    (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
  )
}

export function createIncomeDto(): IncomeDto {
  return {
    id: uuid(),
    date: new Date().toISOString().slice(0, 7),
    name: '',
    amount: 0,
    expectedDay: 0,
    isGot: false,
    notes: '',
  }
}

export async function getDefaultIncomes(date: string) {
  const response = await axios.get(`${apiUrl}/finance/get_default_income?date=${date}`);
  return response.data;
}
