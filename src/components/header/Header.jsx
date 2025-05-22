import { Link } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='header-container'>
      <ul className="nav container-fluid">
        <li className="nav-item">
          <Link className="nav-link" to="/user-details">{user?.userName}</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>Salir</button>
        </li>
      </ul>
    </div>
  )
}
