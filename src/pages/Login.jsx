import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <div className='login-container container-fluid'>
            <div className='row align-items-center'>
                <div className='col'>
                    <form className='login-form'>
                        <div class="row mb-5">
                            <label for="inputEmail3" class="col-3 col-form-label">Correo</label>
                            <div class="col-9">
                                <input type="email" class="form-control" id="inputEmail3"/>
                            </div>
                        </div>
                        <div class="row mb-5">
                            <label for="inputPassword3" class="col-3 col-form-label">Contraseña</label>
                            <div class="col-9">
                                <input type="password" class="form-control" id="inputPassword3"/>
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-7 offset-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="remember"/>
                                        <label class="form-check-label" for="remember">
                                            Recordar
                                        </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                    </form>
                </div>
                <div className='col'>
                    <img src="/portada.jpg" alt="" width="100%" />
                </div>

            </div>


        </div>
    )
}
