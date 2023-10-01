import { AnyAction } from 'redux';
import { UserProp } from '../types/TypesRedux';
import { USER_TYPE } from '../actions';

const initialState = {
  email: '',
  password: '',
};

// Esse reducer será responsável por tratar as informações da pessoa usuária
const UserReducer = (state: UserProp = initialState, action: AnyAction) => {
  switch (action.type) {
    case USER_TYPE:
      return { ...state, ...action.payload };
    default: return state;
  }
};

export default UserReducer;
