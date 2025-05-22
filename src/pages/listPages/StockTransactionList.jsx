import { useEffect, useState } from 'react'
import { stockTransactionService } from '../../api/services';
import Pagination from '../../components/pagination/Pagination';
import { SEARCH_BY_OPTIONS } from '../../utils/constants';

export default function StockTransactionList() {
    const [stockTransactions, setStockTransaction] = useState([]);
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
        setIsListFilter(searchBy === 'Type');
        setFilters({
            searchBy: null,
            searchValue: null,
            page: 1,
            limit: 10
        })
    }, [searchBy]);

    useEffect(() => {
        if (alert) {
            const timeout = setTimeout(() => setAlert(null), 6000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const fetch = async () => {
        try {
            let response = await stockTransactionService.list(filters);
            setStockTransaction(response.data);
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
        <div className='stockTranslist-container container-fluid'>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <h1>Historial de Transacciones</h1>
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
                                <option value="">Todas las transacciones</option>
                                {SEARCH_BY_OPTIONS['stockTransactions'].map((item, idx) => (
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
                                    <option value="">Todos los tipos</option>
                                    <option value='TRANSFER'>TRANSFER</option>
                                    <option value='INCREMENT'>INCREMENT</option>
                                    <option value='DECREMENT'>DECREMENT</option>
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
                
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad modificada</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Ubicación anterior</th>
                                <th scope="col">Ubicación nueva</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockTransactions?.length >= 1
                                ? stockTransactions.map((x) => (
                                    <tr key={x.Id}>
                                        <td>{x.Id}</td>
                                        <td>{new Date(x.Date).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                                        <td>{x.Type}</td>
                                        <td>{x.UserId}</td>
                                        <td>{x.ProductId}</td>
                                        <td>{x.QuantityChange}</td>
                                        <td>{x.Description}</td>
                                        <td>{x.InventoryLocationIdOld}</td>
                                        <td>{x.InventoryLocationIdNew}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan="6" className="text-center">No hay transacciones para mostrar</td></tr>
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
        </div>
    )
}