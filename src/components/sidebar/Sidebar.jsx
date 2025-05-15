import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard"><img className="dashboard-icon" src="/Logo.png" alt="Dashboard" /></Link>
        </li>
        <li className="nav-item"><Link className="nav-link" to="/product-list">Productos</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/supplier-list">Proveedores</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/category-list">Categorías</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/inventoryLocation-list">Ubicaciones</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/stockTransaction-list">Historial</Link></li>
      </ul>
    </div>
  );
}
