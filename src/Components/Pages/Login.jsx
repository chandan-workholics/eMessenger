import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const URL = process.env.REACT_APP_URL;

    const [adminuser_name, setadminuser_name] = useState('');
    const [admin_password, setadmin_password] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();


        setError('');


        if (!adminuser_name || !admin_password) {
            setError('Please enter both adminuser_name and admin_password.');
            return;
        }

        try {

            const response = await fetch(`${URL}/admin/loginAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminuser_name, admin_password }),
            });

            const data = await response.json();


            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('admin_id', data.admin_id);
                // sessionStorage.setItem('userProfileImage', data.schoolDetails[0]?.logo_img);
                navigate('/dashboard');
            } else {

                setError(data.message || 'Invalid adminuser_name or admin_password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Login error:', error);
        }
    };

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
                                        <h4>Hello! Let's get started</h4>
                                        <h5 className="font-weight-medium">Login to continue.</h5>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <form className="pt-3" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <input
                                                    type="test"
                                                    className="form-control form-control-lg"
                                                    id="exampleInputEmail1"
                                                    placeholder="adminuser_name"
                                                    value={adminuser_name}
                                                    onChange={(e) => setadminuser_name(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="admin_password"
                                                    className="form-control form-control-lg"
                                                    id="exampleInputadmin_password1"
                                                    placeholder="admin_password"
                                                    value={admin_password}
                                                    onChange={(e) => setadmin_password(e.target.value)}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                                                    LOGIN
                                                </button>
                                            </div>
                                            <div className="my-2 d-flex justify-content-between align-items-center">
                                                <a href="/" className="auth-link text-black">Forgot Password?</a>
                                            </div>
                                            {/* <div className="text-center mt-4 font-weight-light">
                                                Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                                            </div> */}
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