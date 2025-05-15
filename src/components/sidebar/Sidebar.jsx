import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/product-list">Productos</Link>
          <Link className="nav-link" to="/supplier-list">Proveedores</Link>
          <Link className="nav-link" to="/category-list">Categorías</Link>
          <Link className="nav-link" to="/inventoryLocation-list">Ubicaciones</Link>
          <Link className="nav-link" to="/stockTransaction-list">Historial</Link>
        </li>
      </ul>
    </div>
  );
}
