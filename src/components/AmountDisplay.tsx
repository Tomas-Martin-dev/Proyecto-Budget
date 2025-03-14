import { AmountDisplayProps } from "../types";
import { formatCurrency } from "../helpers";
export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <>
        <p className="text-lg sm:text-xl md:text-2xl text-blue-600 font-bold">
            {label && (
              `${label} : `
            )}
            <span className="font-black text-black">{formatCurrency(amount)}</span>        
        </p>
    </>
  )
}
