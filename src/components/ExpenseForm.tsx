import { categories } from "../data/categories";
import { DraftExpense, Value } from "../types";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { ChangeEvent, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hook/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState('')
  const {dispatch, state} = useBudget()

  useEffect(() =>{
    if(state.editindId){
      const editingExpense = state.expense.filter(currentExpense => currentExpense.id === state.editindId)[0]
      setExpense(editingExpense)
    }
  },[state.editindId])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name] : isAmountField ? +value : value
    })
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      //Validar form
      if(Object.values(expense).includes('')){
        setError('Todos los campos son obligatorios')
        return
      }

      //Agregar o actializar el  gasto
      if(state.editindId){
        dispatch({type:'update-expense', payload:{expense:{id: state.editindId, ...expense}}})

      }else{

        dispatch({type:'add-expense', payload:{expense}})
      }

      //Reiniciar el form
      setExpense({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
      })
  }


  return (
    <form className="space-y-5" onSubmit={handleSubmit }>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-b-blue-500 py-2">
        Nuevo Gasto
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage> }

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre de Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="text"
          id="amount"
          placeholder="Añade la cantidad: ej. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione -- </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
}
