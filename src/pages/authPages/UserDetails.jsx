import { useEffect, useState } from 'react';
import { addressService, userService } from '../../api/services';
import { useAuth } from '../../context/AuthContext';

export default function UserDetails() {
    const { user } = useAuth();
    const id = user.userId;
    const [userData, setUserData] = useState({
        id: '',
        userName: '',
        password: '',
        rol: '',
        firstName: '',
        middleName: '',
        lastName: '',
        secondLastName: '',
        email: '',
        phoneNumber: 0,
        addressId: ''
    });

    const [addressData, setAddressData] = useState({
        id: '',
        address1: '',
        address2: '',
        postalCode: 0,
        city: '',
        country: ''
    });

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (alert) {
            const timeout = setTimeout(() => setAlert(null), 6000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const fetch = async () => {
        try {
            let user = await userService.details(id);
            if (!user) {
                setAlert({
                    type: 'danger',
                    message: 'Error obteniendo datos del usuario'
                });
                return;
            }
            setUserData({
                id: id,
                userName: user.UserName,
                password: '',
                rol: user.Rol,
                firstName: user.FirstName,
                middleName: user.MiddleName,
                lastName: user.LastName,
                secondLastName: user.SecondLastName,
                email: user.Email,
                phoneNumber: user.PhoneNumber,
                addressId: user.AddressId
            });
            setAddressData({
                id: user.AddressId,
                address1: user.Address1,
                address2: user.Address2,
                postalCode: user.PostalCode,
                city: user.City,
                country: user.Country
            });
            setLoading(false);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error obteniendo datos del usuario'
            });
            setLoading(false);
        }
    }

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

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await addressService.update(addressData.id, addressData);
            await userService.update(id, userData);
            setAlert({
                type: 'success',
                message: 'Usuario actualizado con éxito'
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al actualizar el usuario'
            });
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className='productDetails-container container-fluid'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <div className='row'>
                <div className='col ps-5 pe-5'>
                    <div className='mb-5'>
                        <h3 className='mb-5'>Detalles del Usuario</h3>
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
                                placeholder='Nueva Contraseña'
                                value={userData.password}
                                onChange={handleChange}
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
                        <button type="button" onClick={handleSave} className="btn btn-primary">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    )
}