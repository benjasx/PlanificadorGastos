import { useReducer, createContext, Dispatch, ReactNode } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/Budget-reducers";

type BudgetContextPorps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

type BudgetProvidersProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextPorps>(
  {} as BudgetContextPorps
);

export const BudgetProvider = ({ children }: BudgetProvidersProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
