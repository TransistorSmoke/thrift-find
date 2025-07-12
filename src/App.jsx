import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="form-section">
        <Form />
      </div>
    </div>
  );
}

export default App;
