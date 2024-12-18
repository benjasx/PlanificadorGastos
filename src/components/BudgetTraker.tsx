import AmountDisplay from "./AmountDisplay";

export default function BudgetTraker() {
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

        <AmountDisplay label="Pesupuesto" amount={300} />
        <AmountDisplay label="Disponible" amount={200} />
        <AmountDisplay label="Gatado" amount={100} />
      </div>
    </div>
  );
}