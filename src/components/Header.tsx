import { useSelector } from "react-redux";
import { RootProp } from "../redux/types/TypesRedux";
import LogoHeader from "./LogoHeader";
import money from "../imgs/Moedas.svg";
import vector from "../imgs/Vector.svg";

function Header() {
  const Users = useSelector((state: RootProp) => state.user.email);
  const expense = useSelector((state: RootProp) => state.wallet.expenses);
  const valueTotal = expense.reduce((acc, curr) => {
    return (
      acc + Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask)
    );
  }, 0);
  return (
    <header>
      <LogoHeader />
      <p data-testid="total-field" className="valor">
        <img src={money} alt="" />
        {`Total de despesa: ${valueTotal.toFixed(2)} BRL`}
      </p>
      <p data-testid="email-field" className="email">
        <img src={vector} alt="" />
        {Users}
      </p>
    </header>
  );
}

export default Header;

// <p data-testid="header-currency-field">BRL</p>
