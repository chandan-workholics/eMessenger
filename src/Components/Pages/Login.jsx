import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="container">
                            <div className="row w-100 mx-0">
                                <div className="col-lg-7 d-lg-block d-none">
                                    <img src="../../images/auth/login-img.png" alt="" className="w-100" />
                                </div>
                                <div className="col-lg-5 m-auto">
                                    <div className="auth-form-light text-left py-4 py-md-5 px-4 px-sm-5">
                                        <div className="brand-logo text-left">
                                            <img src="../../images/logo.svg" alt="logo" className='w-50' />
                                        </div>
                                        <h4>Hello! let's get started</h4>
                                        <h5 className="font-weight-medium">Login to continue.</h5>
                                        <form className="pt-3">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                            <div className="mt-3">
                                                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">LOGIN</Link>
                                            </div>
                                            <div className="my-2 d-flex justify-content-between align-items-center">
                                                <a href="#" className="auth-link text-black">Forgot password?</a>
                                            </div>
                                            <div className="text-center mt-4 font-weight-light">
                                                Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login