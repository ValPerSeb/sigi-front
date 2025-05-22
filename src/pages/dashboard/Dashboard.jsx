import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getDashboard } from '../../api/api';
import './Dashboard.css';

export default function Dashboard() {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		fetch();
	}, []);

	useEffect(() => {
		if (alert) {
			const timeout = setTimeout(() => setAlert(null), 6000);
			return () => clearTimeout(timeout);
		}
	}, [alert]);

	const fetch = async () => {
		try {
			const dashboardData = await getDashboard();
			if (!dashboardData) {
				setAlert({
					type: 'danger',
					message: 'Error obteniendo datos del dashboard'
				});
				return;
			}
			setData(dashboardData);
			setLoading(false);
		} catch (error) {
			setAlert({
				type: 'danger',
				message: error.message || 'Error obteniendo datos del dashboard'
			});
			setLoading(false);
		}
	}

	if (loading) return <div>Cargando...</div>;

	return (
		<div className='dashboard-container container-fluid'>
			{alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

			<div className="row g-2">
				{/* Total de productos */}
				<div className="col m-4">
					<Link to={'/product-list'} className="text-decoration-none">
						<div className="dashboard-card card text-bg-primary h-100 shadow">
							<div className="card-body text-center d-flex flex-column">
								<h5 className="card-title">Total de productos</h5>
								<div className="flex-grow-1 d-flex justify-content-center align-items-center">
									<p className="display-4 fw-bold mb-0">{data.totalProducts ?? 0}</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
				{/* Totales por categoría */}
				<div className="col m-4">
					<Link  to={'/category-list'} className="text-decoration-none">
						<div className="dashboard-card card h-100 shadow">
							<div className="card-body">
								<h5 className="card-title text-center mb-5">Productos por categoría</h5>
								<ul className="list-unstyled mb-0">
									{data.totalsByCategory?.length > 0 ? data.totalsByCategory.map(cat => (
										<li key={cat.Id} className="d-flex align-items-center mb-2">
											<span
												style={{
													display: 'inline-block',
													width: '16px',
													height: '16px',
													borderRadius: '50%',
													backgroundColor: cat.CategoryColor,
													border: '1px solid #ccc',
													marginRight: '8px'
												}}
												title={cat.CategoryColor}
											></span>
											<span className="flex-grow-1">{cat.CategoryName}</span>
											<span className="badge bg-secondary">{cat.total}</span>
										</li>
									)) : <li>No hay categorías</li>}
								</ul>
							</div>
						</div>
					</Link>
				</div>
			</div>
			<div className="row g-2">
				{/* Totales por ubicación de inventario */}
				<div className="col m-4">
					<Link to={'/inventoryLocation-list'} className="text-decoration-none">
						<div className="dashboard-card card h-100 shadow">
							<div className="card-body">
								<h5 className="card-title text-center mb-5">Productos por ubicación</h5>
								<ul className="list-unstyled mb-0">
									{data.totalsByInventoryLocation?.length > 0 ? data.totalsByInventoryLocation.map(loc => (
										<li key={loc.Id} className="d-flex justify-content-between align-items-center mb-2">
											<span>{loc.LocationName ?? loc.Name}</span>
											<span className="badge bg-info">{loc.total}</span>
										</li>
									)) : <li>No hay ubicaciones</li>}
								</ul>
							</div>
						</div>
					</Link>
				</div>
				{/* Top 3 productos con mayor stock */}
				<div className="col m-4">
					<Link to={'/product-list'} className="text-decoration-none">
						<div className="dashboard-card card h-100 shadow">
							<div className="card-body">
								<h5 className="card-title text-center mb-5">Top 3 productos por stock</h5>
								<ol className="mb-0">
									{data.topProducts?.length > 0 ? data.topProducts.map(prod => (
										<li key={prod.Id} className="d-flex justify-content-between align-items-center mb-2">
											<span>{prod.ProductName}</span>
											<span className="badge bg-success">{prod.Stock}</span>
										</li>
									)) : <li>No hay productos</li>}
								</ol>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}