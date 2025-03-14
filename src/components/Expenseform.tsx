import { categories } from "../data/db"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const Expenseform = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date()
    })
    const [error, setError] = useState("")
    const { state, dispatch, calcDispo } = useBudget();
    const [previusAmount, setPreviusAmount] = useState(0)

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmount = ["amount"].includes(name);
        setExpense({
            ...expense,
            [name]: isAmount ? +value : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son obligatorios")
            return
        } else if (expense.amount <= 0) {
            setError("Cantidad debe ser como minimo 1")
            return
        }
        if ((expense.amount - previusAmount) > calcDispo) {
            setError(`No te queda saldo - Restante: ${calcDispo}`)
            return
        }
        setError("");
        dispatch({ type: "save-newGasto", payload: { expense: expense } })
    }

    useEffect(() => {
        if (state.editId) {
            const editingExpense = state.expenses.filter(e => e.id === state.editId)[0];
            setExpense(editingExpense)
            setPreviusAmount(editingExpense.amount)
        }
    }, [state.editId])

    return (
        <>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {calcDispo === 0 && state.editId === "" ? (
                    <legend className="uppercase text-center text-3xl font-black border-b-4 border-red-500 py-2">
                        No queda Presupuesto disponible para agregar otro Gasto
                    </legend>
                ) : (
                    <>
                        <legend className="uppercase text-center text-3xl font-black border-b-4 border-blue-500 py-2">
                            {state.editId ? "Actualizar Gasto" : "Nuevo Gasto"}
                        </legend>

                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <div className="flex flex-col gap-2">
                            <label className="text-xl" htmlFor="expenseName">
                                Nombre Gasto:
                            </label>
                            <input
                                value={expense.expenseName}
                                type="text"
                                id="expenseName"
                                name="expenseName"
                                placeholder="Añade el Nombre del gasto"
                                className="bg-slate-100 p-2 border border-gray-200"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl" htmlFor="amount">
                                Cantidad:
                            </label>
                            <input
                                value={expense.amount}
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="Añade la cantidad del gasto"
                                className="bg-slate-100 p-2 border border-gray-200"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl" htmlFor="amount">
                                Categoria:
                            </label>
                            <select
                                value={expense.category}
                                name="category"
                                id="category"
                                className="bg-slate-100 p-2 border border-gray-200"
                                onChange={handleChange}
                            ><option value="">---Seleccionar---</option>
                                {categories.map(cat => (
                                    <option
                                        value={cat.id}
                                        key={cat.id}
                                    >{cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xl" htmlFor="expenseName">
                                Fecha Gasto:
                            </label>
                            <DatePicker
                                value={expense.date}
                                className="bg-slate-100 border-0 p-2"
                                onChange={handleChangeDate}
                            />
                        </div>

                        <input type="submit" value={state.editId ? "Actualizar Gasto" : "Registrar Gasto"} className="bg-blue-400 hover:bg-blue-500 transition-colors cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
                    </>
                    )
                }

            </form>
        </>
    )
}
