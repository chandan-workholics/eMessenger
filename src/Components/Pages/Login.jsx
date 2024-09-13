import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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
                                    <h4>Hello! let's get started</h4>
                                    <h6 class="font-weight-light">Login to continue.</h6>
                                    <form class="pt-3">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <div class="mt-3">
                                            <Link class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">LOGIN</Link>
                                        </div>
                                        <div class="my-2 d-flex justify-content-between align-items-center">
                                            <a href="#" class="auth-link text-black">Forgot password?</a>
                                        </div>
                                        <div class="text-center mt-4 font-weight-light">
                                            Don't have an account? <Link to="/register" class="text-primary">Create</Link>
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

export default Login