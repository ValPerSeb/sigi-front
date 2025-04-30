import React from 'react'

export default function Footer() {
  return (
    <footer className="footer-container text-center text-muted py-3 mt-auto">
      <div className="container">
        &copy; {new Date().getFullYear()} C&S Todos los derechos reservados.
      </div>
    </footer>
  )
}
