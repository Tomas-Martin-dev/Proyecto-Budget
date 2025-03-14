import { categories } from "../data/db";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
    
    const { dispatch } = useBudget()
    
    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>)=> {
        dispatch({type: "add-categoryFilter", payload: {id: e.target.value}})
    }

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-10 mb-10">
                <form action="">
                    <div className="flex flex-col  gap-5">
                        <label htmlFor="category" className="w-full">Filtrar por Categoria</label>

                        <select id="category" className="bg-slate-100 p-3 flex-1 rounded" onChange={handleChange}>
                            <option value="" >--- Seleccionar Categoria ---</option>
                            {categories.map(cat => (
                                <option 
                                    value={cat.id}
                                    key={cat.id}
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
        </>
  )
}
