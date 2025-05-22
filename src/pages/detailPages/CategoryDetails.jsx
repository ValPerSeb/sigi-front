import { useEffect, useState } from 'react';
import { categoryService } from '../../api/services';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

export default function CategoryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState({
        id: '',
        name: '',
        color: '',
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
            let category = await categoryService.details(id);
            if (!category) {
                setAlert({
                    type: 'danger',
                    message: 'Error obteniendo datos de la categoría'
                });
                return;
            }
            setCategoryData({
                id: category.Id,
                name: category.CategoryName,
                color: category.CategoryColor
            });
            setLoading(false);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error obteniendo datos de la categoría'
            });
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await categoryService.update(id, categoryData);
            setAlert({
                type: 'success',
                message: 'Categoría actualizado con éxito'
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al actualizar categoría'
            });
        }
    };

    const confirmDelete = async () => {
        try {
            await categoryService.remove(id);
            setShowDeleteModal(false);
            navigate('/category-list', {
                state: {
                    alert: {
                        type: 'success',
                        message: 'Categoría eliminada con éxito'
                    }
                }
            });

        } catch (error) {
            setShowDeleteModal(false);
            setAlert({
                type: 'danger',
                message: error.message || 'Error al eliminar categoría'
            });
        }
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    }

    if (loading) return <div>Cargando...</div>;

    return (
        <div className='categorydetails-container container-fluid'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <h1>Detalles de la categoría</h1>
            <div className="row mb-3 align-items-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary ms-3" onClick={handleDelete}>Eliminar Categoría</button>
                    <button className="btn btn-primary ms-3" onClick={handleSave}>Guardar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <form>
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
                description={'¿Estás seguro de que deseas eliminar esta categoría?'}
            />
        </div>
    )
}