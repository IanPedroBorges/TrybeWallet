import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserProp = {
  email: string;
  password: string;
};

export type RootProp = {
  user: UserProp,
  wallet: ExpenseProp,
};

export type Expense = {
  id: number,
  value: string,
  description: string,
  tag: string,
  method: string,
  currency: string,
  exchangeRates: {
    [name: string]: {
      code: string,
      name: string,
      ask: string,
    }
  }
};
export type ExpenseProps = {
  id: number,
  value: string,
  description: string,
  tag: string,
  method: string,
  currency: string,
  exchangeRates: {
    [name: string]: {
      code: string,
      name: string,
      ask: string,
    }
  }
};

export type ExpenseProp = {
  expenses: Expense[]
  currencies: string[],
  editor: boolean,
  idToEdit?: number,
  total: number
};

export type Dispatch = ThunkDispatch<RootProp, null, AnyAction>;

export type InputValue = {
  value: number,
  description: string,
  tag: string,
  currency: string,
  method: string,
};
