import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Form from './components/Form/Form';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
