import { useEffect, useState } from 'react'
import AddProductModal from '../../components/modal/AddProductModal';
import './ListPage.css'
import { supplierService } from '../../api/services';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import { SEARCH_BY_OPTIONS } from '../../utils/constants';

export default function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [searchBy, setSearchBy] = useState(null);
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
        setFilters({
            searchBy: null,
            searchValue: null,
            page: 1,
            limit: 10
        })
    }, [searchBy])

    const fetch = async () => {
        try {
            let response = await supplierService.list(filters);
            setSuppliers(response.data);
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
    if (alert) return <div className={`alert alert-${alert.type}`}>{alert.message}</div>

    return (
        <div className='productlist-container container-fluid'>
            <h1>Lista de Proveedores</h1>
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
                                <option value="">Todos los proveedores</option>
                                {SEARCH_BY_OPTIONS['suppliers'].map((item, idx) => (
                                    <option key={idx} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {searchBy && (
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers?.length >= 1
                                ? suppliers.map((x) => (
                                    <tr key={x.SupplierId}>
                                        <td><Link to={`/supplier/${x.SupplierId}`}>{x.SupplierId}</Link></td>
                                        <td>{x.Name}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan="2" className="text-center">No hay proveedores para mostrar</td></tr>
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
            <AddProductModal />
        </div>
    )
}