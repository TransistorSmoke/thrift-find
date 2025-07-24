import { useState } from 'react';
import './Login.scss';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFieldErrors, setInputFieldErrors] = useState('');
  const { login, error, isPending } = useLogin();

  const handleLogin = e => {
    e.preventDefault();

    if (email === '' || password === '') {
      setInputFieldErrors('Please input your email and/or password');
    } else {
      login(email, password);
    }
  };

  return (
    <>
      <form className="login" onSubmit={handleLogin}>
        <h1>Log in</h1>
        <label>
          <span>Email</span>
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
            id="email"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
            id="password"
          />
        </label>
        {error && <p className="text-error">{error}</p>}
        {inputFieldErrors && <p className="text-error">{inputFieldErrors}</p>}
        <button className="app-button">
          {!isPending ? 'Login' : 'Logging in...'}
        </button>
        <p className="forgot-password">
          <Link to="/reset-password">Forgot password?</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
