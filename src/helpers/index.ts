import { DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from "uuid";


export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(amount)
}

export function formatDate(dataStr: string) : string {
    const dateObj = new Date(dataStr);
    const options : Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
    return new Intl.DateTimeFormat("es-ES", options).format(dateObj)
}

export function createExpense(drafExpense: DraftExpense) : Expense {
    return{
        ...drafExpense,
        id: uuidv4()
    }
}