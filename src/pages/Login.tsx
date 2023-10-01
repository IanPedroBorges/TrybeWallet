import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserAction } from '../redux/actions';
import LogoHeader from '../components/LogoHeader';

const initialStateLogin = {
  email: '',
  password: '',
};

function Login() {
  const [inputLogin, setInputLogin] = useState(initialStateLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLogin({ ...inputLogin, [event.target.name]: event.target.value });
  };
  const handleInputIsValid = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(inputLogin.email) && inputLogin.password.length >= 6;
  };

  const handleSubmitLogin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(UserAction(inputLogin));
    navigate('/carteira');
  };

  return (
    <div className='loginForm'>
      <LogoHeader />
      <form onSubmit={ handleSubmitLogin }>
        <input
          type="text"
          placeholder="E-mail"
          value={ inputLogin.email }
          name="email"
          onChange={ handleLoginForm }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ inputLogin.password }
          placeholder="Senha"
          onChange={ handleLoginForm }
          data-testid="password-input"
        />
        <button type="submit" disabled={ !handleInputIsValid() }>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
