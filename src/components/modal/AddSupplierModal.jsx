import { useState, useEffect } from 'react';
import { supplierService, addressService } from '../../api/services';

export default function AddSupplierModal({onClose}) {
    const [supplierData, setSupplierData] = useState({
        name: '',
        phoneNumber: 0,
        email: '',
        addressId: ''
    });

    const [addressData, setAddressData] = useState({
        address1: '',
        address2: '',
        postalCode: 0,
        city: '',
        country: ''
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (alert) {
            const timeout = setTimeout(() => setAlert(null), 6000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData(prev => ({
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
            const address = await addressService.add(addressData);
            if(!address) {
                setAlert({
                    type: 'danger',
                    message: 'Error agregando dirección'
                });
                return;
            }
            const newSupplier = {
                ...supplierData,
                addressId: address.id
            };
            await supplierService.add(newSupplier);
            setAlert({
                type: 'success',
                message: 'Proveedor agregado con éxito'
            });
            setAddressData({
                address1: '',
                address2: '',
                postalCode: 0,
                city: '',
                country: ''
            });
            setSupplierData({
                name: '',
                phoneNumber: 0,
                email: '',
                addressId: ''
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error agregando proveedor'
            });
        }
    };

    const handleClose = () => {
        setSupplierData({
            name: '',
            phoneNumber: undefined,
            email: '',
            addressId: ''
        });
        setAddressData({
            address1: '',
            address2: '',
            postalCode: undefined,
            city: '',
            country: ''
        });
        setAlert(null);
        if (onClose) {
            onClose();
        }
    }

    return (
        <div
            className="modal fade"
            id="addSupplierModal"
            tabIndex="-1"
            aria-labelledby="addSupplierModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Proveedor</h5>
                        <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre del Proveedor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={supplierData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={supplierData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={supplierData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address1" className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address1"
                                    name="address1"
                                    value={addressData.address1}
                                    onChange={handleAddressChange}
                                    required
                                />  
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address2" className="form-label">Complemento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address2"
                                    name="address2"
                                    value={addressData.address2}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postalCode" className="form-label">Código Postal</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="postalCode"
                                    name="postalCode"
                                    value={addressData.postalCode}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">Ciudad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={addressData.city}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">País</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    value={addressData.country}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Agregar</button>
                            {alert && <div className={`mt-3 alert alert-${alert.type}`}>{alert.message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}