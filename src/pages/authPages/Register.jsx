import { useState } from 'react';
import { Link } from 'react-router-dom'
import './Auth.css'
import { addressService, userService } from '../../api/services';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        password: '',
        rol: '',
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        email: '',
        phoneNumber: undefined,
        addressId: ''
    });

    const [addressData, setAddressData] = useState({
        address1: '',
        address2: '',
        postalCode: undefined,
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAddress = await addressService.add(addressData);
            

            if (newAddress && newAddress.id) {
                const newUserData = {
                    ...userData,
                    addressId: newAddress.id,
                }

                await userService.add(newUserData);

                setAlert({
                    type: 'success',
                    message: 'Usuario creado con éxito'
                });

                navigate('/');
            } else {
                setAlert({
                    type: 'danger',
                    message: 'Error creando Dirección'
                });
            }
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message ||'Error creando usuario'
            });
        }
    };

    return (
        <div className='auth-container container-fluid'>
            <div className='row'>
                {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                <div className='col ps-5 pe-5'>
                    <div className='mb-5'>
                        <h3 className='mb-5'>Nuevo Usuario</h3>
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
                        <div className="mb-3">
                            <select
                                className="form-select"
                                id="rol"
                                name="rol"
                                value={userData.rol}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Rol</option>
                                <option value='ADMIN'>ADMIN</option>
                                <option value='USER'>USER</option>
                            </select>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h3 className='mb-5'>Información Personal</h3>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                placeholder='Primer Nombre'
                                value={userData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="middleName"
                                name="middleName"
                                placeholder='Segundo Nombre'
                                value={userData.middleName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder='Primer Apellido'
                                value={userData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="secondLastName"
                                name="secondLastName"
                                placeholder='Segundo Apellido'
                                value={userData.secondLastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder='Email'
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder='Teléfono'
                                value={userData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='col ps-5 pe-5'>
                    <div className='mb-5'>
                        <h3 className='mb-5'>Dirección</h3>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="address1"
                                name="address1"
                                placeholder='Dirección principal'
                                value={addressData.address1}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="address2"
                                name="address2"
                                placeholder='Complemento'
                                value={addressData.address2}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                name="postalCode"
                                placeholder='Código Postal'
                                value={addressData.postalCode}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                placeholder='Ciudad'
                                value={addressData.city}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                placeholder='País'
                                value={addressData.country}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Registrarse</button>
                        <span className='ms-3'><Link to={'/'}>Iniciar sesión</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
