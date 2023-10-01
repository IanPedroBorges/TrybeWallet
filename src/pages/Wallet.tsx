import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

function Wallet() {
  return (
    <div className='mainContainer'>
      <section className='mainForm'>
        <Header />
        <WalletForm />
      </section>
      <Table />
    </div>
  );
}

export default Wallet;
