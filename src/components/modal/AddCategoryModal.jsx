import { useState, useEffect } from 'react';
import { categoryService } from '../../api/services';

export default function AddCategoryModal({onClose}) {
    const [categoryData, setCategoryData] = useState({
        name: '',
        color: '',
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
        setCategoryData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await categoryService.add(categoryData);
            setAlert({
                type: 'success',
                message: 'Categoría agregada con éxito'
            });
            setCategoryData({
                name: '',
                color: ''
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error agregando categoría'
            });
        }
    };

    const handleClose = () => {
        setCategoryData({
            name: '',
            color: ''
        });
        setAlert(null);
        if (onClose) {
            onClose();
        }
    }

    return (
        <div
            className="modal fade"
            id="addCategoryModal"
            tabIndex="-1"
            aria-labelledby="addCategoryModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Categoría</h5>
                        <button type="button" onClick={handleClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre de la categoría</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                    placeholder='#FFFFFF'
                                    value={categoryData.color}
                                    onChange={handleChange}
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