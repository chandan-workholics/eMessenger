import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <div class="container-scroller">
                <div class="container-fluid page-body-wrapper full-page-wrapper">
                    <div class="content-wrapper d-flex align-items-center auth px-0">
                        <div class="row w-100 mx-0">
                            <div class="col-lg-4 mx-auto">
                                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div class="brand-logo text-center">
                                        <img src="../../images/logo.svg" alt="logo" />
                                    </div>
                                    <h4>New here?</h4>
                                    <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                                    <form class="pt-3">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <div class="mt-3">
                                            <Link class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/login">SIGN UP</Link>
                                        </div>
                                        <div class="text-center mt-4 font-weight-light">
                                            Already have an account? <Link to="/login" class="text-primary">Login</Link>
                                        </div>
                                    </form>
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