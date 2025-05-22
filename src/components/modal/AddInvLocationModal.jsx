import { useState, useEffect } from 'react';
import { inventoryLocationService } from '../../api/services';

export default function AddInvLocationModal({onClose}) {
    const [invLocationData, setInvLocationData] = useState({
        code: '',
        name: '',
        capacity: 0,
        currentStock: 0,
        isActive: true
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
        setInvLocationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await inventoryLocationService.add(invLocationData);
            setAlert({
                type: 'success',
                message: 'Ubicación agregada con éxito'
            });
            setInvLocationData({
                code: '',
                name: '',
                capacity: 0,
                currentStock: 0,
                isActive: true
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error agregando ubicación'
            });
        }
    };

    const handleClose = () => {
        setInvLocationData({
            code: '',
            name: '',
            capacity: 0,
            currentStock: 0,
            isActive: true
        });
        setAlert(null);
        if (onClose) {
            onClose();
        }
    }

    return (
        <div
            className="modal fade"
            id="addInvLocationModal"
            tabIndex="-1"
            aria-labelledby="addInvLocationModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Ubicación de inventario</h5>
                        <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="code" className="form-label">Código</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    name="code"
                                    value={invLocationData.code}
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
                                    value={invLocationData.name}
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
                                    value={invLocationData.capacity}
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
                                    value={invLocationData.currentStock}
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
                                    checked={invLocationData.isActive}
                                    onChange={(e) => setInvLocationData(prev => ({ ...prev, isActive: e.target.checked }))}
                                />
                                <label className="form-check-label" htmlFor="isActive">Activo</label>
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