import { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword, error, isPending } = useResetPassword();

  const handlePasswordResetRequest = e => {
    e.preventDefault();

    if (!email) {
      setInputError('Please input your email address');
    } else {
      resetPassword(email);
      setEmail('');
      setMessage(
        'Password reset email is sent. Check your inbox or spam folder.'
      );
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handlePasswordResetRequest}>
        <h1>Reset Password</h1>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
            id="email"
          />
        </label>
        {inputError && <p className="text-error">{inputError}</p>}
        {error && <p className="text-error">{error}</p>}
        {message && <p className="text-info">{message}</p>}
        <button className="app-button">
          {!isPending ? 'Reset Password' : 'Sending Reset Email...'}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
