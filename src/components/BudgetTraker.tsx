import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import { useMemo } from "react";


export default function BudgetTraker() {
  const {state} = useBudget()

  const totalExpenses = useMemo(() => state.expense.reduce((total,expense)=> expense.amount + total, 0) , [state.expense])
  const disponible = state.budget - totalExpenses
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Grafico" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          resetear app
        </button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={disponible} />
        <AmountDisplay label="Gatado" amount={totalExpenses} />
      </div>
    </div>
  );
}
