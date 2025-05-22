import { useEffect, useState } from 'react'
import './ListPage.css'
import { categoryService } from '../../api/services';
import Pagination from '../../components/pagination/Pagination';
import { SEARCH_BY_OPTIONS } from '../../utils/constants';
import AddCategoryModal from '../../components/modal/AddCategoryModal';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
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
        setFilters({
            searchBy: null,
            searchValue: null,
            page: 1,
            limit: 10
        })
    }, [searchBy])

    const fetch = async () => {
        try {
            let response = await categoryService.list(filters);
            setCategories(response.data);
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
            <h1>Lista de Categorías</h1>
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
                                <option value="">Todas las categorías</option>
                                {SEARCH_BY_OPTIONS['categories'].map((item, idx) => (
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
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">Agregar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.length >= 1
                                ? categories.map((x) => (
                                    <tr key={x.Id}>
                                        <td>{x.Id}</td>
                                        <td>{x.CategoryName}</td>
                                        <td>{x.CategoryColor}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan="3" className="text-center">No hay categorías para mostrar</td></tr>
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
            <AddCategoryModal onClose={fetch} />
        </div>
    )
}