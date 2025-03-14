import { ReactNode} from "react"
import { BudgetAccions } from "../reducers/budget-reducer"

export type BudgetState = {
    budget: number,
    modal: boolean, 
    expenses: Expense[],
    editId: Expense["id"],
    categoryFilter: Category["id"]
}

export type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.ActionDispatch<[action: BudgetAccions]>
    totalGatos: number,
    calcDispo: number
}

export type BudgetProviderProps = {
    children: ReactNode
}

export type AmountDisplayProps = {
    label: string,
    amount: number
}

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Expense = {
    id: string,
    amount: number,
    expenseName: string,
    category: string,
    date: Value 
}

export type Category = {
    id: string,
    name: string,
    icon: string
}

export type ErrorMessageProps = {
    children: ReactNode,
}

export type ExpenseItemProps = {
    expense: Expense
}

export type DraftExpense = Omit<Expense, "id">

