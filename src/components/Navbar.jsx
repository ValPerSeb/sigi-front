import React from 'react'

export default function Navbar() {
    return (
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="#">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Reportes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Inventario</a>
            </li>
        </ul>
    )
}
