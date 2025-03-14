import { formatDate } from "../helpers";
import { ExpenseItemProps } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/db";
import { useMemo } from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget";


export default function ExpenseItem({ expense }: ExpenseItemProps) {

    const { dispatch } = useBudget();
    const categoryinfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
    
    const leadingActions = ()=>(
        <LeadingActions>
            <SwipeAction 
                onClick={()=>dispatch({type: "addID-expense-upDate", payload: {id:expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = ()=>(
        <TrailingActions>
            <SwipeAction 
                onClick={()=> dispatch({type: "delete-expense", payload:{id: expense.id}})}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <>
            <SwipeableList>
                <SwipeableListItem
                    maxSwipe={30}
                    leadingActions={leadingActions()}
                    trailingActions={trailingActions()}
                >
                    <div className="bg-white shadow-lg py-3 px-3 md:p-5 w-full border-b border-gray-200 flex gap-3 md:gap-5 items-center select-none">
                        <div>
                            <img
                                src={`/icono_${categoryinfo.icon}.svg`}
                                alt="icono categoria"
                                className="w-16 md:w-20"
                            />
                        </div>

                        <div className="flex-1 space-y-3">
                            <p className="text-sm font-black uppercase text-slate-500">{categoryinfo.name}</p>
                            <p>{expense.expenseName}</p>
                            <p className="text-slate-600 text-xs">{formatDate(expense.date!.toString())}</p>
                        </div>

                        <AmountDisplay
                            amount={expense.amount}
                            label=""
                        />
                    </div>
                </SwipeableListItem>
            </SwipeableList>
        </>
    )
}
