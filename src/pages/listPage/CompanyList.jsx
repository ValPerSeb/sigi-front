import { useEffect, useState } from 'react'
import AddCompamyModal from '../../components/modal/AddCompanyModal';
import './ListPage.css'
import {companyService} from '../../api/services';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        searchBy: null,
        searchValue: null,
        page: 1,
        limit: 10
    })

    useEffect(() => {
        fetch();
    }, [filters]);

    const fetch = async () => {
        try {
            let response = await companyService.list(filters);
            setCompanies(response.data);
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
            <h1>Lista de Compañías</h1>
            <div className="row mb-3 mt-5 align-items-center">
                <div className="col-md-6 d-flex justify-content-start">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={filters.searchBy === 'CompanyName' ? filters.searchValue : ''}
                        onChange={(e) => setFilters({ ...filters, searchValue: e.target.value, searchBy: 'CompanyName', page: 1 })}
                    />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCompanyModal">Agregar</button>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className="col-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Nit</th>
                                <th scope="col">Website</th>
                                <th scope="col">Tipo de industria</th>
                                <th scope="col">Representante</th>
                                <th scope="col">Logo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies?.length >= 1 
                                ? companies.map((x) => (
                                    <tr key={x.CompanyId}>
                                        <td><Link to={`/company/${x.CompanyId}`}>{x.CompanyId}</Link></td>
                                        <td>{x.CompanyName}</td>
                                        <td>{x.Nit}</td>
                                        <td>{x.Website}</td>
                                        <td>{x.IndustryType}</td>
                                        <td>{x.LegalRep}</td>
                                        <td>{x.Logo}</td>
                                    </tr>
                                ))
                                : <tr><td colSpan="7" className="text-center">No hay compañías para mostrar</td></tr>
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
            <AddCompamyModal/>
        </div>
    )
}