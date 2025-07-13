import { useState } from 'react';
import './Login.scss';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFieldErrors, setInputFieldErrors] = useState('');
  const { login, error, isPending } = useLogin();

  const handleLogin = e => {
    e.preventDefault();
    console.log('logging in...');

    console.log('email: ', email);
    console.log('password: ', password);

    if (email === '' || password === '') {
      setInputFieldErrors('Please input your email and/or password');
    } else {
      login(email, password);
    }
  };

  return (
    <>
      <form className="login" onSubmit={handleLogin}>
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
        {inputFieldErrors && <p className="text-error">{inputFieldErrors}</p>}
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
