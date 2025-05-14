import { useState } from 'react';
import { companyService, locationService, contactInfoService } from '../../api/services';

export default function AddCompanyModal() {
    const [companyData, setCompanyData] = useState({
        name: '',
        nit: 0,
        website: '',
        industryType: '',
        legalRep: '',
        logo: '',
        contactInfoId: '',
        locationId: ''
    });

    const [contactInfoData, setContactInfoData] = useState({
        phoneNumber: 0,
        mobileNumber: 0,
        email: ''
    });

    const [locationData, setLocationData] = useState({
        addressUno: '',
        addressDos: '',
        postalCode: 0,
        city: '',
        country: ''
    });

    const [alert, setAlert] = useState(null);

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setCompanyData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfoData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setLocationData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const [newLocation, newContactInfo] = await Promise.all([
                locationService.add(locationData),
                contactInfoService.add(contactInfoData)
            ]);

            if (newLocation && newContactInfo) {

                const newCompanyData = {
                    ...companyData,
                    locationId: newLocation.id,
                    contactInfoId: newContactInfo.id,
                }

                await companyService.add(newCompanyData);

                setAlert({
                    type: 'success',
                    message: 'Compañía agregada con éxito'
                });
                setCompanyData({
                    name: '',
                    nit: 0,
                    website: '',
                    industryType: '',
                    legalRep: '',
                    logo: '',
                    contactInfoId: '',
                    locationId: ''
                })
                setContactInfoData({
                    phoneNumber: 0,
                    mobileNumber: 0,
                    email: ''
                })
                setLocationData({
                    addressUno: '',
                    addressDos: '',
                    postalCode: 0,
                    city: '',
                    country: ''
                })
            } else {
                setAlert({
                    type: 'danger',
                    message: 'Error creando Información de ubicación o de contacto'
                });
            }
        } catch (error) {
            setAlert({
                type: 'danger',
                message: 'Error agregando Compañía'
            });
        }
    };

    return (
        <div
            className="modal fade"
            id="addCompanyModal"
            tabIndex="-1"
            aria-labelledby="addProductModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Compañía</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre de la Compañía</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={companyData.name}
                                    onChange={handleCompanyChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nit" className="form-label">Nit</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="nit"
                                    name="nit"
                                    value={companyData.nit || 0}
                                    onChange={handleCompanyChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="website" className="form-label">Website</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="website"
                                    name="website"
                                    value={companyData.website}
                                    onChange={handleCompanyChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="industryType" className="form-label">Tipo de Industria</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="industryType"
                                    name="industryType"
                                    value={companyData.industryType}
                                    onChange={handleCompanyChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="legalRep" className="form-label">Representante Legal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="legalRep"
                                    name="legalRep"
                                    value={companyData.legalRep}
                                    onChange={handleCompanyChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="logo" className="form-label">Logo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="logo"
                                    name="logo"
                                    value={companyData.logo}
                                    onChange={handleCompanyChange}
                                    disabled
                                />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={contactInfoData.phoneNumber || 0}
                                    onChange={handleContactInfoChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mobileNumber" className="form-label">Número de celular</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={contactInfoData.mobileNumber || 0}
                                    onChange={handleContactInfoChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={contactInfoData.email}
                                    onChange={handleContactInfoChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addressUno" className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addressUno"
                                    name="addressUno"
                                    value={locationData.addressUno}
                                    onChange={handleLocationChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addressDos" className="form-label">Dirección Complemento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addressDos"
                                    name="addressDos"
                                    value={locationData.addressDos}
                                    onChange={handleLocationChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="postalCode" className="form-label">Código Postal</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="postalCode"
                                    name="postalCode"
                                    value={locationData.postalCode}
                                    onChange={handleLocationChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">Ciudad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={locationData.city}
                                    onChange={handleLocationChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">País</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    value={locationData.country}
                                    onChange={handleLocationChange}
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