import { useEffect, useState } from 'react'
import { inventoryLocationService } from '../../api/services';
import Pagination from '../../components/pagination/Pagination';
import { SEARCH_BY_OPTIONS } from '../../utils/constants';
import AddInvLocationModal from '../../components/modal/AddInvLocationModal';
import { Link, useLocation } from 'react-router-dom';

export default function InventoryLocationList() {
    const location = useLocation();
    const [inventoryLocations, setInventoryLoc] = useState([]);
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

    useEffect(() => {
        setIsListFilter(searchBy === 'IsActive');
        setFilters({
            searchBy: null,
            searchValue: null,
            page: 1,
            limit: 10
        })
    }, [searchBy])

    const fetch = async () => {
        try {
            let response = await inventoryLocationService.list(filters);
            setInventoryLoc(response.data);
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

    return (
        <div className='productlist-container container-fluid'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <h1>Lista de Ubicaciones en Bodega</h1>
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
                                <option value="">Todos las ubicaciones</option>
                                {SEARCH_BY_OPTIONS['inventoryLocations'].map((item, idx) => (
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
                                        <option value="">Todas los Estados</option>
                                        <option value={1}>Activo</option>
                                        <option value={0}>Inactivo</option>
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
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addInvLocationModal">Agregar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Código Ubicación</th>
                                <th scope="col">Capacidad Total</th>
                                <th scope="col">Ocupación Actual</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryLocations?.length >= 1
                                ? inventoryLocations.map((x) => (
                                    <tr key={x.Id}>
                                        <td><Link to={`/invloc/${x.Id}`}>{x.Id}</Link></td>
                                        <td>{x.LocationName}</td>
                                        <td>{x.LocationCode}</td>
                                        <td>{x.Capacity}</td>
                                        <td>{x.CurrentStock}</td>
                                        <td>{x.IsActive ? 'Activo':'Inactivo'}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan="6" className="text-center">No hay ubicaciones para mostrar</td></tr>
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
            <AddInvLocationModal onClose={fetch} />
        </div>
    )
}