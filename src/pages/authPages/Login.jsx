import { useState } from 'react';
import { Link } from 'react-router-dom'
import './Auth.css'
import { useAuth } from '../../context/AuthContext';
import { postLogin } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        password: ''
    });
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await postLogin(userData);
            login(res.token);
            navigate('/dashboard');
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Credenciales inválidas'
            });
        }
    };

    return (
        <div className='auth-container container-fluid'>
            <div className='row align-items-center'>
                <div className='col'>
                    {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                    <div className='login-form mb-5'>
                        <h3 className='mb-5'>¡Bienvenido!</h3>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                placeholder='Usuario'
                                value={userData.userName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder='Contraseña'
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mt-5'>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">Iniciar sesión</button>
                            <span className='ms-3'><Link to={'/register'}>Registrarse</Link></span>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <img src="/portada.jpg" alt="" width="100%" />
                </div>

            </div>
        </div>
    )
}
