import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget";

export default function BugedForm() {
    
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const handleChange = (e : number) => {
        setBudget(e)
    }
    
    const isValid = useMemo(()=>{
        if (isNaN(budget) || budget <= 0) {
            return false
        }
        return true
    },[budget])

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: "save-Budget", payload:{value: budget}})
    }
    
    return (
    <>
        <form 
            className="space-y-5"
            onSubmit={(e)=> handleSubmit(e)}
        >
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-400 font-black text-center">Definir Presupuesto</label>
            
                <input 
                    type="number" 
                    id="budget"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={(e)=> handleChange(+e.target.value)}
                />
            </div>
            <input 
                type="submit" 
                value="Aceptar" 
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-10 disabled:cursor-default cursor-pointer w-full p-2 text-white font-medium transition-colors" 
                disabled={!isValid}
            />
        </form>
    </>
  )
}
