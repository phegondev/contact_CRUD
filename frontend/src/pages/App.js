import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import './App.css';
import Home from './pages/Home';
import View from './pages/View';
import AddEdit from './pages/AddEdit';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:id' element={<AddEdit />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/add/' element={<AddEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
