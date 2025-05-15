import { Routes, Route, useLocation  } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import "./App.css"
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import ProductList from './pages/listPage/ProductList'
import ProductDetails from './pages/productDetail/ProductDetail'
import SupplierList from './pages/listPage/SupplierList'
import CategoryList from './pages/listPage/CategoryList'
import StockTransactionList from './pages/listPage/StockTransactionList'
import InventoryLocationList from './pages/listPage/InventoryLocationList'

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
          <Route path='/supplier-list' element={<SupplierList />} />
          <Route path='/category-list' element={<CategoryList />} />
          <Route path='/inventoryLocation-list' element={<InventoryLocationList />} />
          <Route path='/stockTransaction-list' element={<StockTransactionList />} />

          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
