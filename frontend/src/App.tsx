import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Toaster position="top-center" toastOptions={{ duration: 1200 }} />
    </div>
  )
}

export default App
