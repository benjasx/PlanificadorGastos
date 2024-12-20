import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hook/useBudget";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTraker() {
  const {state, totalExpenses, disponible, dispatch} = useBudget()
  const precentage = +((totalExpenses/state.budget) * 100).toFixed(2)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={precentage}
          styles={buildStyles({
            pathColor:precentage === 100 ? '#D62626':'#3B82F6',
            trailColor: '#F5F5F5',
            textSize: 8, 
            textColor: precentage === 100 ? '#D62626':'#3B82F6',
          })}
          text={`${precentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={()=> dispatch({type:'reset-app'})}
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
