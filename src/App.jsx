import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import "./App.css"

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product-list' element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
