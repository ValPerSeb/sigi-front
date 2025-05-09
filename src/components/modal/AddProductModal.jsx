import { useState } from 'react';
import { addProduct } from '../../service/productService';

export default function AddProductModal({ show, handleClose }) {
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
    const [alert, setAlert] = useState(null);

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
            await addProduct(productData);
            setAlert({
                type: 'success',
                message: 'Producto agregado con éxito'
            });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error agregando producto'
            });
        }
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
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
                                    value={productData.unitPrice}
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
                                    value={productData.stock}
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
                                    value={productData.companyId}
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
                                    value={productData.supplierId}
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
                                    value={productData.categoryId}
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
                                    value={productData.inventoryLocationId}
                                    onChange={handleChange}
                                    required
                                />
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