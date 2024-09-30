import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="container">
                            <div className="row w-100 mx-0">
                                <div className="col-lg-5 m-auto">
                                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                        <div className="brand-logo text-left">
                                            <img src="../../images/logo.svg" alt="logo" className='w-50'/>
                                        </div>
                                        <h4>New here?</h4>
                                        <h5 className="font-weight-medium">Signing up is easy. It only takes a few steps</h5>
                                        <form className="pt-3">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-lg bg-white" id="exampleInputUsername1" placeholder="Username" />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg bg-white" id="exampleInputEmail1" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg bg-white" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                            <div className="mt-3">
                                                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">SIGN UP</Link>
                                            </div>
                                            <div className="text-center mt-4 font-weight-light">
                                                Already have an account? <Link to="/" className="text-primary">Login</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-7 d-lg-block d-none">
                                    <img src="../../images/auth/signin-img.png" alt="" className="w-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register