import { Routes, Route, useLocation  } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import "./App.css"
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import ProductList from './pages/productList/ProductList'

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  return (
    <div className='app-container'>
      {showNavbar && 
        <>
          <Header />
          <Sidebar />
        </> 
      }
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/product-list' element={<ProductList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
