import { useEffect, useState } from 'react';
import './ProductDetail.css';
import { productService } from '../../api/services';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        id: '',
        productName: '',
        unitPrice: null,
        stock: null,
        companyId: '',
        supplierId: '',
        categoryId: '',
        inventoryLocationId: ''
    });
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            let product = await productService.details(id);
            setProductData({
                id: product.ProductId,
                productName: product.ProductName,
                unitPrice: product.UnitPrice,
                stock: product.Stock,
                companyId: product.CompanyId,
                supplierId: product.SupplierId,
                categoryId: product.CategoryId,
                inventoryLocationId: product.InventoryLocationId
            });
            setLoading(false);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error obteniendo datos del producto'
            });
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await productService.update(id, productData);
            setAlert({
                type: 'success',
                message: 'Producto actualizado con éxito'
            });
            setTimeout(() => setAlert(null), 6000)
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al actualizar el producto'
            });
        }
    };

    const confirmDelete = async () => {
        try {
            await productService.remove(id);
            setShowDeleteModal(false);
            setAlert({
                type: 'success',
                message: 'Producto eliminado con éxito'
            });
            setTimeout(() => setAlert(null), 6000);
            navigate('/product-list');
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message || 'Error al eliminar el producto'
            });
            setShowDeleteModal(false);
        }
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    }

    if (loading) return <div>Cargando producto...</div>;

    return (
        <div className='productDetails-container container-fluid'>
            <ConfirmationModal 
                show={showDeleteModal} 
                handleClose={() => setShowDeleteModal(false)} 
                handleConfirm={confirmDelete} 
                title={'Confirmar eliminación'}
                description={'¿Estás seguro de que deseas eliminar este producto?'}
            />
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <h1>Detalles del Producto</h1>
            <div className="row mb-3 align-items-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary ms-3" onClick={handleDelete}>Eliminar Producto</button>
                    <button className="btn btn-primary ms-3" onClick={handleSave}>Guardar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                name="productName"
                                value={productData?.productName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="unitPrice" className="form-label">Precio Unitario</label>
                            <input
                                type="number"
                                className="form-control"
                                id="unitPrice"
                                name="unitPrice"
                                value={productData?.unitPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock"
                                name="stock"
                                value={productData?.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="companyId" className="form-label">ID de la Compañía</label>
                            <input
                                type="text"
                                className="form-control"
                                id="companyId"
                                name="companyId"
                                value={productData?.companyId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="supplierId" className="form-label">ID del Proveedor</label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplierId"
                                name="supplierId"
                                value={productData?.supplierId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">ID de la Categoría</label>
                            <input
                                type="text"
                                className="form-control"
                                id="categoryId"
                                name="categoryId"
                                value={productData?.categoryId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inventoryLocationId" className="form-label">ID de la Ubicación de Inventario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inventoryLocationId"
                                name="inventoryLocationId"
                                value={productData?.inventoryLocationId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}