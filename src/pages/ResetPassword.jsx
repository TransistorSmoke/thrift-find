import { useState } from 'react';
import useSignup from '../hooks/useSignup';
import './Signup.scss';

const ResetPassword = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFieldErrors, setInputFieldErrors] = useState('');
  const { signup, error, isPending } = useSignup();

  const handleSignup = e => {
    e.preventDefault();

    if (displayName === '' || email === '' || password === '') {
      setInputFieldErrors(
        'Please input your display name, email and/or password'
      );
    } else {
      signup(email, password, displayName);
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handleSignup}>
        <h1>Reset Password</h1>
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
        {inputFieldErrors && <p className="text-error">{inputFieldErrors}</p>}
        {error && <p className="text-error">{error}</p>}
        <button>
          {!isPending ? 'Reset Password' : 'Sending Reset Email...'}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
