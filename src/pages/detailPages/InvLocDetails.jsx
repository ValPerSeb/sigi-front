import { useEffect, useState } from 'react';
import { inventoryLocationService } from '../../api/services';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

export default function InvLocDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invLocData, setInvLocData] = useState({
        id: '',
        code: '',
        name: '',
        capacity: 0,
        currentStock: 0,
        isActive: true
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
            let invLoc = await inventoryLocationService.details(id);
            if (!invLoc) {
                setAlert({
                    type: 'danger',
                    message: 'Error obteniendo datos de la ubicación de inventario'
                });
                return;
            }
            setInvLocData({
                id: invLoc.Id,
                code: invLoc.LocationCode,
                name: invLoc.LocationName,
                capacity: invLoc.Capacity,
                currentStock: invLoc.CurrentStock,
                isActive: invLoc.IsActive
            });
            setLoading(false);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error obteniendo datos de la ubicación de inventario'
            });
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvLocData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await inventoryLocationService.update(id, invLocData);
            setAlert({
                type: 'success',
                message: 'Ubicación de inventario actualizada con éxito'
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al actualizar ubicación de inventario'
            });
        }
    };

    const confirmDelete = async () => {
        try {
            await inventoryLocationService.remove(id);
            setShowDeleteModal(false);
            navigate('/inventoryLocation-list', {
                state: {
                    alert: {
                        type: 'success',
                        message: 'Ubicación de inventario eliminada con éxito'
                    }
                }
            });

        } catch (error) {
            setShowDeleteModal(false);
            setAlert({
                type: 'danger',
                message: error.message || 'Error al eliminar ubicación de inventario'
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
            <h1>Detalles de la Ubicación de inventario</h1>
            <div className="row mb-3 align-items-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary ms-3" onClick={handleDelete}>Eliminar Ubicación</button>
                    <button className="btn btn-primary ms-3" onClick={handleSave}>Guardar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Código</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                name="code"
                                value={invLocData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={invLocData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Capacidad</label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                name="capacity"
                                value={invLocData.capacity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="currentStock" className="form-label">Ocupación actual</label>
                            <input
                                type="number"
                                className="form-control"
                                id="currentStock"
                                name="currentStock"
                                value={invLocData.currentStock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isActive"
                                name="isActive"
                                checked={invLocData.isActive}
                                onChange={(e) => setInvLocData(prev => ({ ...prev, isActive: e.target.checked }))}
                            />
                            <label className="form-check-label" htmlFor="isActive">Activo</label>
                        </div>
                    </form>
                </div>
            </div>
            <ConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={confirmDelete}
                title={'Confirmar eliminación'}
                description={'¿Estás seguro de que deseas eliminar esta ubicación?'}
            />
        </div>
    )
}