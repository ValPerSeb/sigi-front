import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <div className='header-container'>
      <ul className="nav container-fluid">
        <li className="nav-item">
          <Link className="nav-link" to="#">UserName</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Salir</Link>
        </li>
      </ul>
    </div>
  )
}
