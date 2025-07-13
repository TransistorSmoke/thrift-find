import { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    e.preventDefault();
    console.log('logging in...');
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
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
