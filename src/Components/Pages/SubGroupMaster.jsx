import React from 'react'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'
import SortableTable from '../Template/SortableTable';

const SubGroupMaster = () => {

    // Table columns
    const columns = [
        { label: 'Sub Group ID', key: 'subGroupId' },
        { label: 'Sub Group Name', key: 'SunGroupName' },
        { label: 'Group Name', key: 'groupName' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' } // Changed to lowercase for consistency
    ];

    // Table data
    const data = [
        {
            subGroupId: 101,
            SunGroupName: 'CEP - 10th',
            groupName: 'Session 2024-2025',
            isActive: true,
            action: (
                <div>
                    <i className="fa-solid fa-pen-to-square mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                </div>
            ),
        },
        {
            subGroupId: 101,
            SunGroupName: 'CEP - 12th',
            groupName: 'Session 2023-2024',
            isActive: true,
            action: (
                <div>
                    <i className="fa-solid fa-pen-to-square mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                </div>
            ),
        },
        // Add more rows as needed for pagination...
    ];

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
                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Sub Group Master</h3>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-md-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <h4 className="card-title mb-0 mr-2">Message Sub Group Entry Form</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="exampleInputName1">Sub Group Name<span className="text-danger">*</span></label>
                                                                            <input type="text" className="form-control" id="exampleInputName1" placeholder="Full Name" />
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Main Group<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="userType">
                                                                                <option selected disabled>Choose Option</option>
                                                                                <option>Session 2023-2024</option>
                                                                                <option>Session 2024-2025</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Status</label><br />
                                                                            <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                                <label className="btn btn-light active py-2">
                                                                                    <input type="radio" name="options" id="option1" autocomplete="off" checked /> Active
                                                                                </label>
                                                                                <label className="btn btn-light py-2">
                                                                                    <input type="radio" name="options" id="option2" autocomplete="off" /> Inactive
                                                                                </label>
                                                                            </div>
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
                                    <div className="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <p className="card-title">Message Sub Group List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <input type="search" className="form-control" id="exampleInputName1" placeholder="Full Name" />
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <button type="submit" className="btn btn-primary mr-2">search</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <SortableTable columns={columns} data={data} />
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubGroupMaster