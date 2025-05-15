import { Routes, Route, useLocation  } from 'react-router-dom'
import "./App.css"
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/authPages/Login'
import ProductList from './pages/listPages/ProductList'
import ProductDetails from './pages/detailPages/ProductDetail'
import SupplierList from './pages/listPages/SupplierList'
import CategoryList from './pages/listPages/CategoryList'
import StockTransactionList from './pages/listPages/StockTransactionList'
import InventoryLocationList from './pages/listPages/InventoryLocationList'
import Register from './pages/authPages/Register'
import PrivateRoute from './context/PrivateRoute'

function App() {
  const location = useLocation();
  const showNavbar = !['/', '/register'].includes(location.pathname);
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
          <Route path='/register' element={<Register />} />

          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          <Route path='/product-list' element={<PrivateRoute><ProductList /></PrivateRoute>} />
          <Route path='/supplier-list' element={<PrivateRoute><SupplierList /></PrivateRoute>} />
          <Route path='/category-list' element={<PrivateRoute><CategoryList /></PrivateRoute>} />
          <Route path='/inventoryLocation-list' element={<PrivateRoute><InventoryLocationList /></PrivateRoute>} />
          <Route path='/stockTransaction-list' element={<PrivateRoute><StockTransactionList /></PrivateRoute>} />

          <Route path='/product/:id' element={<PrivateRoute><ProductDetails /></PrivateRoute>} />

          {/*<Route path='/company-list' element={<PrivateRoute requiredRoles={['SUPER']}><StockTransactionList /></PrivateRoute>} />*/}
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
