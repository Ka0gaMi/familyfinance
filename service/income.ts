import axios from "axios";
import { apiUrl } from "../config/config";
import moment from "moment";

export interface IncomeDto {
  id: string;
  date: string;
  name: string;
  amount: number | string;
  expectedDay: number | string;
  isGot: boolean;
  notes: string;
}

export async function fetchIncomes(): Promise<IncomeDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_incomes`);
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

export async function deleteIncome(income: IncomeDto) {
  const response = await axios.delete(`${apiUrl}/finance/delete_income`, { data: income });
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
    date: moment().format('YYYY-MM'),
    name: '',
    amount: 0,
    expectedDay: 0,
    isGot: false,
    notes: '',
  }
}

export async function getDefaultIncomes(date: string): Promise<IncomeDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_default_income?date=${date}`);
  return response.data;
}

export async function getDefaults(): Promise<IncomeDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_default_incomes`);
  return response.data;
}
