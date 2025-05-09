import { useEffect, useState } from 'react'
import AddProductModal from '../../components/modal/AddProductModal';
import './ProductList.css'
import { productList } from '../../service/productService';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            let products = await productList();
            setProducts(products);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='productlist-container container-fluid'>
            <AddProductModal show={showModal} handleClose={handleClose} />
            <h1>Lista de Productos</h1>
            <div className="row mb-3 align-items-center">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleShow}>Agregar Producto</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID Producto</th>
                                <th scope="col">Nombre Producto</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.ProductId}>
                                    <td><Link to={`/product/${product.ProductId}`}>{product.ProductId}</Link></td>
                                    <td>{product.ProductName}</td>
                                    <td>{product.UnitPrice}</td>
                                    <td>{product.Stock}</td>
                                    <td>{product.CategoryId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}