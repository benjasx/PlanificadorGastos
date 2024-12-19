import { DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'
export type BudgetActions = 
    {type:'add-budget', payload:{budget: number}} |
    {type:'show-modal'} |
    {type:'close-modal'}|
    {type:'add-expense', payload:{expense:DraftExpense}}

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
}

export const initialState : BudgetState = {
    budget:0,
    modal:false, 
    expense:[]
}

export const createExpense = (draftxpense:DraftExpense) : Expense=> {
    return{
        ...draftxpense,
        id:uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    actions: BudgetActions
) =>{

    if(actions.type === 'add-budget'){
        return{
            ...state,
            budget: actions.payload.budget
        }
    }

    if(actions.type === 'show-modal'){
        return{
            ...state,
            modal:true
        }
    }

    if(actions.type === 'close-modal'){
        return{
            ...state,
            modal:false
        }
    }

    if(actions.type === 'add-expense'){
        const expense = createExpense(actions.payload.expense)
        return{
            ...state,
            expense: [...state.expense, expense],   
            modal:false
        }
    }
    return state
}

