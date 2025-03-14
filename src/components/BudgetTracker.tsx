import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function BudgetTracker() {

    const { state, dispatch, calcDispo, totalGatos } = useBudget()
    let percentage = ( totalGatos / state.budget) * 100;
    percentage = parseFloat(percentage.toFixed(2));
    console.log(percentage,totalGatos,calcDispo);
    

    return (
        <>
            <div className="grid gird-cols-1 md:grid-cols-2 gap-10">
                <div className="flex justify-center md:bg-white md:rounded-lg md:shadow-lg py-6">
                    <div className="flex justify-center">
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(200, 2, 449, ${percentage / 100})`,
                                textColor: '#f88',
                                trailColor: '#f6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-8 md:bg-white md:rounded-lg md:shadow-lg md:p-6">
                    <button
                        className="bg-pink-600 w-full max-w-8/12 p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
                        onClick={()=>dispatch({type: "Reset-App"})}
                    >Resetear App
                    </button>

                    <AmountDisplay
                        label="Presupuesto"
                        amount={state.budget}
                    />
                    <AmountDisplay
                        label="Disponible"
                        amount={calcDispo}
                    />

                    <AmountDisplay
                        label="Gastado"
                        amount={totalGatos}
                    />
                </div>

            </div>
        </>
    )
}
