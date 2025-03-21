import BudgetTracker from "./components/BudgetTracker";
import BugedForm from "./components/BugedForm"
import ExpenseList from "./components/ExpenseList";
import ExpenseModal from "./components/ExpenseModal";
import FilterByCategory from "./components/FilterByCategory";
import { useBudget } from "./hooks/useBudget"
import { useEffect, useMemo } from "react";

function App() {

  const {state} = useBudget();
  const isValidBudget = useMemo(()=> state.budget > 0, [state.budget]);
  
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(state.expenses))
    localStorage.setItem("budget", JSON.stringify(state.budget))
  }, [state])


  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de Gastos</h1>
      </header>

      <div>
        <div className="max-w-9/12 md:mx-auto mt-10 p-4 md:p-10 bg-white md:bg-transparent shadow-lg md:shadow-none md:rounded-lg">
          {isValidBudget ? <BudgetTracker/> : <BugedForm/>}
        </div>

        {isValidBudget && (
          <main className=" md:max-w-9/12 mx-auto py-10">
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal/>
          </main>
        )}
      </div>
    </>
  )
}

export default App
