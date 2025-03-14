import { createContext, useReducer, useMemo } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import { BudgetContextProps, BudgetProviderProps } from "../types"


export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
// export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) =>{
    
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalGatos = useMemo( ()=> state.expenses.reduce((total,gasto) => total + gasto.amount, 0), [state.expenses]);
    
    const calcDispo = useMemo( ()=> state.budget - totalGatos, [state]);
    
    
    return (
       <BudgetContext.Provider
        value={{
            state,
            dispatch, 
            totalGatos,
            calcDispo
        }}
       >
            {children}
       </BudgetContext.Provider>   
    )
}