import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/Budget-reducers";

type BudgetContextPorps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number,
  disponible: number
};

type BudgetProvidersProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextPorps>(
  {} as BudgetContextPorps
);

export const BudgetProvider = ({ children }: BudgetProvidersProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expense.reduce((total, expense) => expense.amount + total, 0),
    [state.expense]
  );
  const disponible = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        disponible
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
