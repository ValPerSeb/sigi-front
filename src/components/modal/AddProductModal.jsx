import { useState, useEffect } from 'react';
import { productService, companyService, supplierService, categoryService, inventoryLocationService } from '../../api/services';

export default function AddProductModal() {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inventyoryLoc, setInventoryLoc] = useState([]);
    const [productData, setProductData] = useState({
        productName: '',
        unitPrice: undefined,
        stock: undefined,
        supplierId: '',
        categoryId: '',
        inventoryLocationId: ''
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productService.add(productData);
            setAlert({
                type: 'success',
                message: 'Producto agregado con éxito'
            });
            setProductData({
                productName: '',
                unitPrice: undefined,
                stock: undefined,
                supplierId: '',
                categoryId: '',
                inventoryLocationId: ''
            })
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error agregando producto'
            });
        }
    };

    return (
        <div
            className="modal fade"
            id="addProductModal"
            tabIndex="-1"
            aria-labelledby="addProductModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    name="productName"
                                    value={productData.productName}
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
                                    value={productData.unitPrice || 0}
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
                                    value={productData.stock || 0}
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

                            <button type="submit" className="btn btn-primary">Agregar</button>
                            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}