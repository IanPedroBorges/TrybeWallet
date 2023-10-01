import { useDispatch, useSelector } from 'react-redux';
import { Expense, RootProp } from '../redux/types/TypesRedux';
import { TableActionDelete, TableActionInitialEdit } from '../redux/actions';

import edit from '../imgs/Editar.svg';
import del from '../imgs/Excluir.svg';

function Table() {
  const dispatch = useDispatch();
  const expense = useSelector((state: RootProp) => state.wallet.expenses);
  const handleClickDelete = (id: number) => {
    dispatch(TableActionDelete(id));
  };

  const handleEditClick = (id: number | undefined) => {
    dispatch(TableActionInitialEdit(id));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((el: Expense) => (
            <tr key={ el.id }>
              <td>{el.description}</td>
              <td>{el.tag}</td>
              <td>{el.method}</td>
              <td>{`${el.value}.00`}</td>
              <td>{el.exchangeRates[el.currency].name}</td>
              <td>{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
              <td>
                {(
                  Number(el.value) * Number(el.exchangeRates[el.currency].ask)
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
              <button
                  data-testid="edit-btn"
                  onClick={ () => handleEditClick(el.id) }
                >
                  <img src={ edit } alt="" />
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => handleClickDelete(Number(el.id)) }
                >
                  <img src={ del } alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
