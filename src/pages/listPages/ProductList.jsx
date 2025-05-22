import { useEffect, useState } from 'react'
import AddProductModal from '../../components/modal/AddProductModal';
import { productService, categoryService, inventoryLocationService, supplierService } from '../../api/services';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import { SEARCH_BY_OPTIONS } from '../../utils/constants';

export default function ProductList() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inventyoryLoc, setInventoryLoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [searchBy, setSearchBy] = useState(null);
    const [isListFilter, setIsListFilter] = useState(false);
    const [filters, setFilters] = useState({
        searchBy: null,
        searchValue: null,
        page: 1,
        limit: 10
    })

    useEffect(() => {
        fetch();
    }, [filters]);

    useEffect(() => {
        if (searchBy === 'CategoryId') {
            fetchCategories();
        } else if (searchBy === 'SupplierId') {
            fetchSuppliers();
        } else if (searchBy === 'InventoryLocationId') {
            fetchInventoryLocs();
        }
        const listOptions = ['CategoryId', 'SupplierId', 'InventoryLocationId'];
        setIsListFilter(listOptions.includes(searchBy));
        setFilters({
            searchBy: null,
            searchValue: null,
            page: 1,
            limit: 10
        })
    }, [searchBy]);

    useEffect(() => {
        if (location.state?.alert) {
            window.history.replaceState({}, document.title);
            setAlert(location.state.alert);
        }
    }, [location.state]);

    useEffect(() => {
        if (alert) {
            const timeout = setTimeout(() => setAlert(null), 6000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const fetch = async () => {
        try {
            let response = await productService.list(filters);
            setProducts(response.data);
            setTotalPages(Math.ceil(response.total / filters.limit));
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.message
            })
        } finally {
            setLoading(false);
        }
    }

    const fetchCategories = async () => {
        try {
            const categoriesData = await categoryService.list();
            setCategories(categoriesData.data);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error cargando lista'
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const suppliersData = await supplierService.list();
            setSuppliers(suppliersData.data);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error cargando lista'
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchInventoryLocs = async () => {
        try {
            const inventoryLocsData = await inventoryLocationService.list();
            setInventoryLoc(inventoryLocsData.data);
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error cargando lista'
            });
        } finally {
            setLoading(false);
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

    const handleSetFilters = (newSearchValue) => {
        setFilters({
            ...filters,
            searchValue: newSearchValue,
            searchBy,
            page: 1
        })
    }

    if (loading) return <div>Cargando...</div>;

    return (
        <div className='productlist-container container-fluid'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <h1>Lista de Productos</h1>
            <div className="row mb-3 mt-5 align-items-center">
                <div className="col-md-6">
                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <div>
                            <label htmlFor="searchBy" className="form-label mb-0 me-2">Buscar por:</label>
                        </div>
                        <div>
                            <select
                                id="searchBy"
                                className="form-select"
                                value={searchBy ?? ''}
                                onChange={(e) => setSearchBy(e.target.value)}
                            >
                                <option value="">Todos los productos</option>
                                {SEARCH_BY_OPTIONS['products'].map((item, idx) => (
                                    <option key={idx} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {isListFilter && (
                            <div>
                                <select
                                    className="form-select"
                                    value={filters.searchValue ?? ''}
                                    onChange={(e) => handleSetFilters(e.target.value)}
                                >
                                    {searchBy === 'CategoryId' && <>
                                        <option value="">Todas las categorías</option>
                                        {categories.map((item) => (
                                            <option key={item.Id} value={item.Id}>
                                                {item.CategoryName}
                                            </option>
                                        ))}
                                    </>}
                                    {searchBy === 'SupplierId' && <>
                                        <option value="">Todos los proveedores</option>
                                        {suppliers.map((item) => (
                                            <option key={item.Id} value={item.Id}>
                                                {item.SupplierName}
                                            </option>
                                        ))}
                                    </>}
                                    {searchBy === 'InventoryLocationId' && <>
                                        <option value="">Todas las ubicaciones</option>
                                        {inventyoryLoc.map((item) => (
                                            <option key={item.Id} value={item.Id}>
                                                {item.LocationName}
                                            </option>
                                        ))}
                                    </>}
                                </select>
                            </div>
                        )}

                        {!isListFilter && searchBy && (
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Ingrese valor'
                                    value={filters.searchValue ?? ''}
                                    onChange={(e) => handleSetFilters(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">Agregar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover table-bordered">
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
                                    <tr key={x.Id}>
                                        <td><Link to={`/product/${x.Id}`}>{x.Id}</Link></td>
                                        <td>{x.ProductName}</td>
                                        <td>{x.UnitPrice}</td>
                                        <td>{x.Stock}</td>
                                        <td>{x.CategoryName}</td>
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
            <AddProductModal onClose={fetch}/>
        </div>
    )
}