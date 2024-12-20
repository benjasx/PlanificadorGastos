import { useMemo } from "react";
import { useBudget } from "../hook/useBudget";
import ExpenseDetail from "./ExpenseDetail";
export default function ExpenseList() {
  const { state } = useBudget()
  const filterExpenses = state.currentCategory ? state.expense.filter(expense => expense.category === state.currentCategory) : state.expense
  const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses])
  return (
    <div className="mt-10 bg-white shadow-lg p-10 w-full border-b border-gray-200 ">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold text-center">No Hay Gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                {filterExpenses.map(expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
        )}
    </div>
  )
}
