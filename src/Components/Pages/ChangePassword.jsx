import React, { useState } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'

const ChangePassword = () => {

    const URL = process.env.REACT_APP_URL;
    const token = sessionStorage.getItem('token');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Simple validation
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const response = await fetch(`${URL}/admin/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to change password');
            }

            const result = await response.json();
            setSuccess('Password updated successfully');
            setError(null);
        } catch (error) {
            setError('Error updating password');
            setSuccess(null);
        }
    };

    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">

                    {/* SideBar */}
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
                                    <div className="container mt-5">
                                        <div className="row">
                                            <div className="col-lg-6 d-flex">
                                                <img src="images/Reset-password-img.png" alt="" className="w-100 m-auto" />
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
                                                                    <label htmlFor="oldPassword">Old Password<span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="oldPassword"
                                                                        placeholder="Please Enter Old Password"
                                                                        value={oldPassword}
                                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 form-group">
                                                                    <label htmlFor="newPassword">New Password<span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="newPassword"
                                                                        placeholder="Please Enter New Password"
                                                                        value={newPassword}
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 form-group">
                                                                    <label htmlFor="confirmPassword">Confirm Password<span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="confirmPassword"
                                                                        placeholder="Please Confirm Password"
                                                                        value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            {error && <div className="alert alert-danger">{error}</div>}
                                                            {success && <div className="alert alert-success">{success}</div>}
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                            <button type="button" className="btn btn-light" onClick={() => { setOldPassword(''); setNewPassword(''); setConfirmPassword(''); }}>Cancel</button>
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
    )
}

export default ChangePassword