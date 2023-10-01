import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import mockData from '../helpers/mockData';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../../App';

const emailType = 'trybe@trybe.com';
const password = '123456';

describe('testando a aplicação', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });
  test('testando se existe os componentes do login', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveProperty('disabled');
  });
  test('testando as funcionalidades do login', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    await userEvent.type(inputEmail, emailType);
    await userEvent.type(inputPass, password);
    expect(inputEmail).toHaveValue(emailType);
    expect(inputPass).toHaveValue(password);
    await userEvent.click(button);
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByTestId('total-field')).toBeInTheDocument();
    expect(await screen.findByTestId('header-currency-field')).toBeInTheDocument();
    expect(await screen.findByTestId('email-field')).toBeInTheDocument();
  });
  test('testando as funcionalidades da  pagina Wallet', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    await userEvent.type(inputEmail, emailType);
    await userEvent.type(inputPass, password);
    await userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const categoryInput = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const methodInput = screen.getByRole('combobox', { name: /metodo de pagamento/i });
    const moneyInput = screen.getByRole('combobox', { name: /moeda/i });
    const btn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(descriptionInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(moneyInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  test('testando o resto da pagina wallet', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    await userEvent.type(inputEmail, emailType);
    await userEvent.type(inputPass, password);
    await userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const descriptionInput = screen.getByRole('textbox', { name: /descrição da despesa/i });
    const valueInput = screen.getByRole('spinbutton', { name: /valor/i });
    const categoryInput = screen.getByRole('combobox', { name: /categoria da despesa/i });
    const methodInput = screen.getByRole('combobox', { name: /metodo de pagamento/i });
    const moneyInput = screen.getByRole('combobox', { name: /moeda/i });
    const btn = screen.getByRole('button', { name: /adicionar despesa/i });
    await userEvent.type(descriptionInput, 'ola');
    await userEvent.type(valueInput, '5');
    await userEvent.selectOptions(categoryInput, 'Lazer');
    await userEvent.selectOptions(methodInput, 'Dinheiro');
    await userEvent.selectOptions(moneyInput, 'USD');
    await userEvent.click(btn);
    expect(await screen.findByRole('cell', { name: /ola/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /lazer/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /dinheiro/i })).toBeInTheDocument();
    const btnDel = screen.getByRole('button', { name: /excluir/i });
    await userEvent.click(btnDel);
    expect(screen.queryByRole('cell', { name: /ola/i })).not.toBeInTheDocument();
  });
});
