import { useEffect, useState } from 'react'
import AddProductModal from '../../components/modal/AddProductModal';
import './ListPage.css'
import {productService, categoryService} from '../../api/services';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        searchBy: '',
        searchValue: '',
        page: 1,
        limit: 10
    })

    useEffect(() => {
        fetch();
    }, [filters]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetch = async () => {
        try {
            let response = await productService.list(filters);
            setProducts(response.data);
            setTotalPages(Math.ceil(response.total / filters.limit));
            setLoading(false);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message
            })
            setLoading(false);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await categoryService.list();
            setCategories(response.data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setFilters({
                ...filters,
                page: newPage
            });
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (alert) return <div className={`alert alert-${alert.type}`}>{alert.message}</div>

    return (
        <div className='productlist-container container-fluid'>
            <h1>Lista de Productos</h1>
            <div className="row mb-3 mt-5 align-items-center">
                <div className="col-md-6 d-flex justify-content-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={filters.searchBy === 'ProductName' ? filters.searchValue : ''}
                        onChange={(e) => setFilters({ ...filters, searchValue: e.target.value, searchBy: 'ProductName', page: 1 })}
                    />
                    <select
                        className="form-control ms-2"
                        value={filters.searchBy === 'CategoryId' ? filters.searchValue : ''}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                searchValue: e.target.value,
                                searchBy: 'CategoryId',
                                page: 1
                            })
                        }
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat) => (
                            <option key={cat.CategoryId} value={cat.CategoryId}>
                                {cat.CategoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">Agregar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.length >= 1 
                                ? products.map((x) => (
                                    <tr key={x.ProductId}>
                                        <td><Link to={`/product/${x.ProductId}`}>{x.ProductId}</Link></td>
                                        <td>{x.ProductName}</td>
                                        <td>{x.UnitPrice}</td>
                                        <td>{x.Stock}</td>
                                        <td>{x.CategoryId}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan="5" className="text-center">No hay productos para mostrar</td></tr>
                            }
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={filters.page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <AddProductModal/>
        </div>
    )
}