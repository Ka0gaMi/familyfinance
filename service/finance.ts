import axios from "axios";
import { apiUrl } from "../config/config";
import moment from "moment";
import { TypeDto } from "./type";

export interface FinanceDto {
  id: string;
  date: string;
  type: TypeDto;
  expectedExpensesAmount: number | string;
  actualExpensesAmount: number | string;
}

export async function fetchFinances(): Promise<FinanceDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_finances`);
  return response.data;
}

export async function addFinance(finance: FinanceDto) {
  const response = await axios.post(`${apiUrl}/finance/add_finance`, finance);
  return response.data;
}

export async function deleteFinance(finance: FinanceDto) {
  const response = await axios.delete(`${apiUrl}/finance/delete_finance`, { data: finance });
  return response.data;
}

export async function updateFinance(finance: FinanceDto): Promise<FinanceDto> {
  const response = await axios.put(`${apiUrl}/finance/update_finance`, finance);
  return response.data;
}

function uuid() {
  return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, (c: string) =>
    (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
  )
}

export function createFinanceDto(): FinanceDto {
  return {
    id: uuid(),
    date: moment().format('YYYY-MM'),
    type: {
      id: uuid(),
      name: '',
    },
    expectedExpensesAmount: 0,
    actualExpensesAmount: 0
  }
}

export async function getDefaultFinances(date: string): Promise<FinanceDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_default_finance?date=${date}`);
  return response.data;
}
