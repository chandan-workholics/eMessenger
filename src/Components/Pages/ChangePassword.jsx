import React from 'react'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'

const ChangePassword = () => {
    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">
                    <SidebarSettingPannel />

                    {/* SideBar */}
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Change Password</h3>
                                        {/* <h6 className="text-primary font-weight-bold">NEW</h6> */}
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
                                                        <form className="forms-sample">
                                                            <h4 className="card-description text-primary font-weight-bolder">Reset your Password</h4>
                                                            <div className="row">
                                                                <div className="col-md-12 form-group">
                                                                    <label for="exampleInputName1">Old Password<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="Please Enter Old Password" />
                                                                </div>
                                                                <div className="col-md-12 form-group">
                                                                    <label for="exampleInputName1">New Password<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="Please Enter New Password" />
                                                                </div>
                                                                <div className="col-md-12 form-group">
                                                                    <label for="exampleInputName1">Confirm Password<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="Please Confirm Password" />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                            <button className="btn btn-light">Cancel</button>
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