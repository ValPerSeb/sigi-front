import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        
      </Router>
      <Footer />
    </>
  )
}

export default App
