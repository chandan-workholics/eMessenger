import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <div class="container-scroller">
                <div class="container-fluid page-body-wrapper full-page-wrapper">
                    <div class="content-wrapper d-flex align-items-center auth px-0">
                        <div className="container">
                            <div class="row w-100 mx-0">
                                <div class="col-lg-5 m-auto">
                                    <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                                        <div class="brand-logo text-left">
                                            <img src="../../images/logo.svg" alt="logo" className='w-50'/>
                                        </div>
                                        <h4>New here?</h4>
                                        <h5 class="font-weight-medium">Signing up is easy. It only takes a few steps</h5>
                                        <form class="pt-3">
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-lg bg-white" id="exampleInputUsername1" placeholder="Username" />
                                            </div>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-lg bg-white" id="exampleInputEmail1" placeholder="Email" />
                                            </div>
                                            <div class="form-group">
                                                <input type="password" class="form-control form-control-lg bg-white" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                            <div class="mt-3">
                                                <Link class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">SIGN UP</Link>
                                            </div>
                                            <div class="text-center mt-4 font-weight-light">
                                                Already have an account? <Link to="/" class="text-primary">Login</Link>
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