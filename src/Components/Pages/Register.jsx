import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';

const Register = () => {

    const [formData, setFormData] = useState({
        full_name: '',
        adminuser_name: '',
        admin_password: '',
        mobile_no: '',
        admin_type: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Validations
    const validateForm = () => {
        const { adminuser_name, admin_password, mobile_no } = formData;

        // Username validation: at least 3 characters
        if (adminuser_name.length < 3) {
            setError('Username must be at least 3 characters long.');
            return false;
        }

        // Password validation: at least 6 characters
        if (admin_password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }

        // Mobile number validation: must be exactly 10 digits
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile_no)) {
            setError('Mobile number must be exactly 10 digits.');
            return false;
        }

        // If all validations pass, clear the error
        setError(null);
        return true;
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run validation before submission
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await callAPI.post(`./admin/createAdmin`, formData);
            if (response.status >= 200 && response.status < 300) {
                toast.success('Sign up successfully');
            } else {
                toast.error('Failed to Sign Up');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
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
                                            <div className=" form-group">
                                                <select className="form-control" id="userType" name='admin_type' value={formData.admin_type} onChange={handleChange} required>
                                                    <option value='' selected disabled>Select User Type</option>
                                                    <option value='admin'>Admin</option>
                                                    <option value='management'>Management</option>
                                                    <option value='user'>User</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg bg-white"
                                                    name="full_name"
                                                    placeholder="Full Name"
                                                    value={formData.full_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg bg-white"
                                                    name="adminuser_name"
                                                    placeholder="Username"
                                                    value={formData.adminuser_name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg bg-white"
                                                    name="admin_password"
                                                    placeholder="Password"
                                                    value={formData.admin_password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="tel"
                                                    className="form-control form-control-lg bg-white"
                                                    name="mobile_no"
                                                    placeholder="Mobile No."
                                                    value={formData.mobile_no}
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
