import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        mobile: '',
        role: 'admin'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${URL}/admin/createAdmin`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Signup successful!');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                                            <img src="../../images/logo.svg" alt="logo" className='w-50' />
                                        </div>
                                        <h4>New here?</h4>
                                        <h5 className="font-weight-medium">Signing up is easy. It only takes a few steps</h5>
                                        <form className="pt-3" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg bg-white"
                                                    name="fullName"
                                                    placeholder="Full Name"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg bg-white"
                                                    name="username"
                                                    placeholder="Username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg bg-white"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="tel"
                                                    className="form-control form-control-lg bg-white"
                                                    name="mobile"
                                                    placeholder="Mobile No."
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Signing up...' : 'SIGN UP'}
                                                </button>
                                            </div>
                                            <div className="text-center mt-4 font-weight-light">
                                                Already have an account? <Link to="/" className="text-primary">Login</Link>
                                            </div>
                                        </form>
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                        {success && <p style={{ color: 'green' }}>{success}</p>}
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
    );
};

export default Register;
