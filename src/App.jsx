import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer/Footer';
import { useAuthContext } from './hooks/useAuthContext';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { deleteToastSettings as settings } from './utilities/utilities';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/reset-password"
                element={user ? <Navigate to="/" /> : <ResetPassword />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      )}
      <ToastContainer transition={Bounce} />
    </div>
  );
}

export default App;
