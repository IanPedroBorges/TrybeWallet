import { Dispatch } from 'redux';
import { Expense, UserProp } from '../types/TypesRedux';
import { ApiFetch } from '../../utils/ApiFetch';

// Coloque aqui suas actions
export const USER_TYPE = 'USER_TYPE';
export const WALLET_FETCH_TYPE = 'WALLET_FETCH';
export const WALLET_INPUT_FETCH_TYPE = 'WALLET_FETCH_INPUT';
export const WALLET_INPUT_EXPENSE_TYPE = 'WALLET_INPUT_EXPENSE_TYPE';
export const TABLE_CLICK_DELETE = 'TABLE_CLICK_DELETE';
export const TABLE_CLICK_EDIT = 'TABLE_CLICK_EDIT';
export const TABLE_INITIAL_EDIT = 'TABLE_INITIAL_EDIT';

export const UserAction = (payload: UserProp) => ({
  type: USER_TYPE,
  payload,
});

export const TableActionDelete = (id: number) => ({
  type: TABLE_CLICK_DELETE,
  key: id,
});

export const TableActionEdit = (payload: Expense) => ({
  type: TABLE_CLICK_EDIT,
  payload,
});

export const TableActionInitialEdit = (id: number | undefined) => ({
  type: TABLE_INITIAL_EDIT,
  id,
});

export const WalletFetch = (payload: any) => ({
  type: WALLET_FETCH_TYPE,
  payload,
});

export const WalletInputExpense = (payload: Expense) => ({
  type: WALLET_INPUT_EXPENSE_TYPE,
  payload,
});

export const ActionFetch = () => {
  return async (dispatch: Dispatch) => {
    const data = await ApiFetch();
    delete data.USDT;
    dispatch(WalletFetch(Object.keys(data)));
  };
};
