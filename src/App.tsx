import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './index.css';

function App() {
  return (
    <main>
      <Routes>
        <Route index element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet /> } />
      </Routes>
    </main>
  );
}

export default App;
