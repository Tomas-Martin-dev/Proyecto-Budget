import { useContext } from "react"
import { BudgetContext } from "../context/budgetContext"

export const useBudget = () =>{
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error("useBudgate se debe utilizar por medio de un Provider")
    }
    return context
}