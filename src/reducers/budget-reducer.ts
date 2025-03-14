import { createExpense } from "../helpers";
import { BudgetState, Category, DraftExpense, Expense } from "../types";

export type BudgetAccions =
    { type: "save-Budget", payload: { value: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "save-newGasto", payload: { expense: DraftExpense } } |
    { type: "delete-expense", payload: { id: Expense["id"] } } |
    { type: "addID-expense-upDate", payload: { id: Expense["id"] } } |
    { type: "Reset-App" } |
    { type: "add-categoryFilter", payload: {id: Category["id"]} }
;

const expensesLocalStorage = localStorage.getItem("gastos");
const budgetLocalStorage = localStorage.getItem("budget");
export const initialState: BudgetState = {
    budget: budgetLocalStorage ? JSON.parse(budgetLocalStorage) : 0,
    modal: false,
    expenses: expensesLocalStorage ? JSON.parse(expensesLocalStorage) : [],
    editId: "",
    categoryFilter: ""
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetAccions
) => {
    if (action.type === "save-Budget") {
        return {
            ...state,
            budget: action.payload.value
        }
    }
    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            editId: ""
        }
    }
    if (action.type === "save-newGasto") {
        if (state.editId) {
            const updatedExpenses = state.expenses.map(e =>
                e.id === state.editId ? { ...e, ...action.payload.expense } : e
            );

            return {
                ...state,
                expenses: updatedExpenses,
                editId: "",
                modal: false
            };
        }
        // si llega hasta aca state.editID esta vacio
        let newExpense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, newExpense],
            modal: false
        };
    }
    if (action.type === "delete-expense") {
        let arrayFil = state.expenses.filter(e => e.id !== action.payload.id);

        return {
            ...state,
            expenses: arrayFil
        }
    }
    if (action.type === "addID-expense-upDate") {
        return {
            ...state,
            editId: action.payload.id,
            modal: true
        }
    }
    if (action.type === "Reset-App") {
        return {
            ...state,
            budget: 0,
            expenses: [],
            editId: ""
        }
    }
    if (action.type === "add-categoryFilter") {
        return{
            ...state,
            categoryFilter: action.payload.id
        }
    }
    return state
}