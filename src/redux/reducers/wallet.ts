// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { TABLE_CLICK_DELETE,
  TABLE_CLICK_EDIT, TABLE_INITIAL_EDIT, WALLET_FETCH_TYPE, WALLET_INPUT_EXPENSE_TYPE }
  from '../actions';
import { Expense } from '../types/TypesRedux';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const WalletReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case WALLET_FETCH_TYPE:
      return { ...state, currencies: [...action.payload] };
    case WALLET_INPUT_EXPENSE_TYPE:
      return {
        ...state,
        expenses: [...state.expenses,
          { ...action.payload,
            id: state.expenses.length,
            exchangeRates: action.payload.exchangeRates }],
      };
    case TABLE_CLICK_DELETE:
      return { ...state,
        expenses: state.expenses
          .filter((el:Expense) => el.id !== action.key) };
    case TABLE_INITIAL_EDIT:
      return { ...state, editor: true, idToEdit: action.id };
    case TABLE_CLICK_EDIT:
      return {
        ...state,
        editor: false,
        expenses: state.expenses.map((el: Expense) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        }),
      };
    default: return state;
  }
};

export default WalletReducer;
