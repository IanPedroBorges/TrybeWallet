import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootProp } from '../redux/types/TypesRedux';
import {
  ActionFetch,
  TableActionEdit,
  WalletInputExpense,
} from '../redux/actions';
import { ApiFetch } from '../utils/ApiFetch';

const initialState = {
  value: '',
  description: '',
  tag: 'food',
  method: 'dinheiro',
  currency: 'USD',
  id: 0,
};

function WalletForm() {
  const [inputWalletForm, setInputWalletForm] = useState(initialState);
  const dispatch: Dispatch = useDispatch();
  const currency = useSelector((state: RootProp) => state.wallet.currencies);
  const { expenses, editor, idToEdit } = useSelector(
    (state: RootProp) => state.wallet,
  );

  useEffect(() => {
    dispatch(ActionFetch());
    if (editor) {
      const edit = expenses.find((e) => e.id === idToEdit);
      setInputWalletForm(edit ?? initialState);
    }
  }, [dispatch, editor]);

  const handleInputForm = (
    e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setInputWalletForm({
      ...inputWalletForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitWalletForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await ApiFetch();
    dispatch(
      WalletInputExpense({
        ...inputWalletForm,
        exchangeRates: data,
      }),
    );
    setInputWalletForm(initialState);
  };
  const handleFormEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dat = await ApiFetch();
    dispatch(
      TableActionEdit({
        ...inputWalletForm,
        exchangeRates: dat,
      }),
    );
    setInputWalletForm(initialState);
  };
  return (
    <div className='mainFormInputs'>
      {editor ? (
        <form onSubmit={ handleFormEdit }>
          <div>
            <label htmlFor="description-expense">Descrição da despesa</label>
            <input
              type="text"
              data-testid="description-input"
              id="description-expense"
              name="description"
              onChange={ handleInputForm }
              value={ inputWalletForm.description }
            />
          </div>
          <div>
            <label htmlFor="tag">Categoria da despesa</label>
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ inputWalletForm.tag }
              onChange={ handleInputForm }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <div>
            <label htmlFor="value">Valor</label>
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              onChange={ handleInputForm }
              value={ inputWalletForm.value }
            />
          </div>
          <div>
            <label htmlFor="method">Metodo de pagamento</label>
            <select
              name="method"
              onChange={ handleInputForm }
              id="method"
              data-testid="method-input"
              value={ inputWalletForm.method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div>
            <label htmlFor="currency">Moeda</label>
            <select
              name="currency"
              onChange={ handleInputForm }
              id="currency"
              data-testid="currency-input"
              value={ inputWalletForm.currency }
            >
              {currency?.map((el) => (
                <option key={ el } value={ el }>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <button>Editar despesa</button>
        </form>
      ) : (
        <form onSubmit={ handleSubmitWalletForm }>
          <div>
            <label htmlFor="description-expense">Descrição da despesa</label>
            <input
              type="text"
              data-testid="description-input"
              id="description-expense"
              name="description"
              onChange={ handleInputForm }
              value={ inputWalletForm.description }
            />
          </div>
          <div>
            <label htmlFor="tag">Categoria da despesa</label>
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ handleInputForm }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
          <div>
            <label htmlFor="value">Valor</label>
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              onChange={ handleInputForm }
              value={ inputWalletForm.value }
            />
          </div>
          <div>
            <label htmlFor="method">Metodo de pagamento</label>
            <select
              name="method"
              onChange={ handleInputForm }
              id="method"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
          <div>
            <label htmlFor="currency">Moeda</label>
            <select
              name="currency"
              onChange={ handleInputForm }
              id="currency"
              data-testid="currency-input"
            >
              {currency?.map((el) => (
                <option key={ el } value={ el }>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <button>Adicionar despesa</button>
        </form>
      )}
    </div>
  );
}

export default WalletForm;
