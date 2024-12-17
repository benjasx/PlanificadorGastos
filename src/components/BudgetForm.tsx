import { useMemo, useState } from "react";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setBudget(e.target.valueAsNumber)
  };

  //Validacion dle formulario
  const isValid = useMemo (()=> {
    return isNaN(budget) || budget <= 0
  },[budget])

  
  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define Tu Presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Definir Presupuesto"
        className="disabled:opacity-40 cursor-pointer bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold"
        disabled={isValid}
      />
    </form>
  );
}
