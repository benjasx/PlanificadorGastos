
import { DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'
export type BudgetActions = 
    {type:'add-budget', payload:{budget: number}} |
    {type:'show-modal'} |
    {type:'close-modal'}|
    {type:'add-expense', payload:{expense:DraftExpense}} |
    {type:'remove-expense', payload:{id: Expense['id']}} |
    {type:'getexpense-by-id', payload:{id:Expense['id']}}|
    {type:'update-expense', payload:{expense: Expense}}

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editindId: Expense['id']
}

export const initialState : BudgetState = {
    budget:0,
    modal:false, 
    expense:[],
    editindId:''
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
            modal:false,
            editindId:''
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

    if(actions.type === 'remove-expense'){
        return{
            ...state,
            expense: state.expense.filter(expense => expense.id !== actions.payload.id)
        }
    }

    if(actions.type === 'getexpense-by-id'){
        return{
            ...state,
            editindId: actions.payload.id,
            modal:true
        }
    }

    if(actions.type === 'update-expense'){
        return{
            ...state,
            expense: state.expense.map(expense => expense.id === actions.payload.expense.id ? actions.payload.expense : expense),
            modal:false,
            editindId:''
        }
    }
    return state
}

