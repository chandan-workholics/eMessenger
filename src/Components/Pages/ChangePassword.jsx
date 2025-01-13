import React, { useState } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const id = sessionStorage.getItem('admin_id');
    const admin_id = parseInt(id);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const logout = () => {
        sessionStorage.clear();
        toast.info('Session expired, please log in again.');
        setTimeout(() => {
            window.location.href = '/'; // Redirect to login page after 3 seconds
        }, 5000); // 3-second delay
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            setSuccess('');
            return;
        }
        try {
            const response = await callAPI.put('/admin/updatePassword', {
                admin_id: admin_id,
                old_password: oldPassword,
                new_password: newPassword,
            });

            if (response.status === 200) {
                toast.success('Password updated successfully. Logging out...');
                setSuccess('Password updated successfully');
                setError('');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                logout(); // Automatically log the user out
            } else {
                throw new Error(response.message || 'Failed to change password');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating password');
            setError(error.response?.data?.message || 'Error updating password');
            setSuccess('');
        }
    };

    const resetForm = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
    };

    return (
        <>
            <div className="container-scroller">
                {/* Navbar */}
                <Navbar />

                <div className="container-fluid page-body-wrapper">
                    {/* Sidebar */}
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Change Password</h3>
                                    </div>
                                </div>
                                <div className="col-12 grid-margin stretch-card m-auto">
                                    <div className="container mt-0 mt-lg-5">
                                        <div className="row">
                                            <div className="col-lg-6 d-flex">
                                                <img
                                                    src="images/Reset-password-img.png"
                                                    alt="Reset Password"
                                                    className="w-100 m-auto"
                                                />
                                            </div>
                                            <div className="col-lg-6 m-auto">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <form className="forms-sample" onSubmit={handlePasswordChange}>
                                                            <h4 className="card-description text-primary font-weight-bolder">
                                                                Reset your Password
                                                            </h4>
                                                            <div className="row">
                                                                <div className="col-md-12 form-group">
                                                                    <label htmlFor="oldPassword">
                                                                        Old Password<span className="text-danger">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="oldPassword"
                                                                        placeholder="Enter Old Password"
                                                                        value={oldPassword}
                                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 form-group">
                                                                    <label htmlFor="newPassword">
                                                                        New Password<span className="text-danger">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="newPassword"
                                                                        placeholder="Enter New Password"
                                                                        value={newPassword}
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 form-group">
                                                                    <label htmlFor="confirmPassword">
                                                                        Confirm Password<span className="text-danger">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="confirmPassword"
                                                                        placeholder="Confirm New Password"
                                                                        value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            {error && <div className="alert alert-danger">{error}</div>}
                                                            {success && <div className="alert alert-success">{success}</div>}
                                                            <button type="submit" className="btn btn-primary mr-2">
                                                                Submit
                                                            </button>
                                                            <button type="button" className="btn btn-light" onClick={resetForm}>
                                                                Cancel
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
