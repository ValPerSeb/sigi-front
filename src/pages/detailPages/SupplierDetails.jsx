import { useEffect, useState } from 'react';
import './DetailPage.css';
import { supplierService, addressService } from '../../api/services';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

export default function SupplierDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplierData, setSupplierData] = useState({
        id: '',
        name: '',
        phoneNumber: 0,
        email: '',
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
            let supplier = await supplierService.details(id);
            if (!supplier) {
                setAlert({
                    type: 'danger',
                    message: 'Error obteniendo datos del proveedor'
                });
                return;
            }
            setSupplierData({
                id: supplier.Id,
                name: supplier.SupplierName,
                phoneNumber: supplier.PhoneNumber,
                email: supplier.Email,
                addressId: supplier.AddressId
            });
            setAddressData({
                id: supplier.AddressId,
                address1: supplier.Address1,
                address2: supplier.Address2,
                postalCode: supplier.PostalCode,
                city: supplier.City,
                country: supplier.Country
            });
            setLoading(false);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error obteniendo datos del proveedor'
            });
            setLoading(false);
        }
    }

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

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await addressService.update(addressData.id, addressData);
            await supplierService.update(id, supplierData);
            setAlert({
                type: 'success',
                message: 'Proveedor actualizado con éxito'
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al actualizar el proveedor'
            });
        }
    };

    const confirmDelete = async () => {
        try {
            await supplierService.remove(id);
            setShowDeleteModal(false);
            navigate('/supplier-list', {
                state: {
                    alert: {
                        type: 'success',
                        message: 'Proveedor eliminado con éxito'
                    }
                }
            });

        } catch (error) {
            setShowDeleteModal(false);
            setAlert({
                type: 'danger',
                message: error.message || 'Error al eliminar el proveedor'
            });
        }
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    }

    if (loading) return <div>Cargando...</div>;

    return (
        <div className='productDetails-container container-fluid'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <h1>Detalles del Proveedor</h1>
            <div className="row mb-3 align-items-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary ms-3" onClick={handleDelete}>Eliminar Proveedor</button>
                    <button className="btn btn-primary ms-3" onClick={handleSave}>Guardar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <form>
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
                    </form>
                </div>
            </div>
            <ConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={confirmDelete}
                title={'Confirmar eliminación'}
                description={'¿Estás seguro de que deseas eliminar este proveedor?'}
            />
        </div>
    )
}