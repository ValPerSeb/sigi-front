import { useEffect, useState } from 'react';
import './DetailPage.css';
import { productService, categoryService, supplierService, inventoryLocationService } from '../../api/services';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inventyoryLoc, setInventoryLoc] = useState([]);
    const [productData, setProductData] = useState({
        id: '',
        productName: '',
        unitPrice: undefined,
        stock: undefined,
        supplierId: '',
        categoryId: '',
        inventoryLocationId: ''
    });
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchProduct();
        fetchData();
    }, []);

    useEffect(() => {
        if (alert) {
            const timeout = setTimeout(() => setAlert(null), 6000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const fetchProduct = async () => {
        try {
            let product = await productService.details(id);
            setProductData({
                id: product.Id,
                productName: product.ProductName,
                unitPrice: product.UnitPrice,
                stock: product.Stock,
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

    const fetchData = async () => {
        try {
            const [suppliersData, categoriesData, inventoryLocsData] = await Promise.all([
                supplierService.list(),
                categoryService.list(),
                inventoryLocationService.list()
            ]);

            setSuppliers(suppliersData.data);
            setCategories(categoriesData.data);
            setInventoryLoc(inventoryLocsData.data);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error cargando listas'
            });
        }
    };

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
            navigate('/product-list', {
                state: {
                    alert: {
                        type: 'success',
                        message: 'Producto eliminado con éxito'
                    }
                }
            });
            
        } catch (error) {
            setShowDeleteModal(false);
            setAlert({
                type: 'danger',
                message: error.message || 'Error al eliminar el producto'
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
                            <label htmlFor="supplierId" className="form-label">Proveedor</label>
                            <select
                                className="form-select"
                                id="supplierId"
                                name="supplierId"
                                value={productData.supplierId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un proveedor</option>
                                {suppliers.map(supplier => (
                                    <option key={supplier.Id} value={supplier.Id}>
                                        {supplier.SupplierName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">Categoría</label>
                            <select
                                className="form-select"
                                id="categoryId"
                                name="categoryId"
                                value={productData.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map(category => (
                                    <option key={category.Id} value={category.Id}>
                                        {category.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inventoryLocationId" className="form-label">Ubicación de Inventario</label>
                            <select
                                className="form-select"
                                id="inventoryLocationId"
                                name="inventoryLocationId"
                                value={productData.inventoryLocationId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una ubicación</option>
                                {inventyoryLoc.map(location => (
                                    <option key={location.Id} value={location.Id}>
                                        {location.LocationName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <ConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={confirmDelete}
                title={'Confirmar eliminación'}
                description={'¿Estás seguro de que deseas eliminar este producto?'}
            />
        </div>
    )
}