import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
    
    const { state } = useBudget();

    const filterExpenses =  state.categoryFilter ? state.expenses.filter( e => e.category === state.categoryFilter) : state.expenses;

    const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses]);
    
    return (
        <>
            {isEmpty ?
                <p className="text-gray-600 text-2xl font-bold text-center">No hay Gastos Registrados</p>
                : (
                    <>
                        <p className="text-gray-600 text-2xl font-bold my-5 px-2 md:px-0"> Listado de Gastos:</p>
                        {   filterExpenses.map(e => (
                                <ExpenseItem key={e.id} expense={e} />
                            ))
                        }
                    </>
                )
            }
        </>
    )
}
