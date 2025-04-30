import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <div className='login-container container-fluid'>
            <div className='row align-items-center'>
                <div className='col'>
                    <form className='login-form'>
                        <div className="row mb-5">
                            <label htmlFor="inputEmail3" className="col-3 col-form-label">Correo</label>
                            <div className="col-9">
                                <input type="email" className="form-control" id="inputEmail3"/>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <label htmlFor="inputPassword3" className="col-3 col-form-label">Contraseña</label>
                            <div className="col-9">
                                <input type="password" className="form-control" id="inputPassword3"/>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-7 offset-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="remember"/>
                                        <label className="form-check-label" htmlFor="remember">
                                            Recordar
                                        </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </form>
                </div>
                <div className='col'>
                    <img src="/portada.jpg" alt="" width="100%" />
                </div>

            </div>


        </div>
    )
}
