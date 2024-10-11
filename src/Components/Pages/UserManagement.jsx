import React, { useState, useEffect } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import SortableTable from '../Template/SortableTable';
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import callAPI from '../../commonMethod/api';

const UserManagement = () => {
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState({ full_name: '', adminuser_name: '', admin_password: '', is_active: '', admin_type: '', mobile_no: '', added_admin_id: '1', parent_admin_id: '' })
    const [admindata, setAdminData] = useState()

    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

    useEffect(() => {
        getAdminData();
    }, []);

    const getAdminData = async () => {
        try {
            const response = await callAPI.get(`./admin/getAllAdmin?page=1&limit=50`);
            setAdminData(response?.data);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalPages / rowsPerPage));
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };


    const columns = [
        { label: 'User ID', key: 'userId' },
        { label: 'Full Name', key: 'fullName' },
        { label: 'User Name', key: 'userName' },
        { label: 'User Type', key: 'userType' },
        { label: 'Mobile No.', key: 'mobileNo' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' }
    ];

    const data = admindata ? admindata?.data?.map((val) => ({
        userId: val?.admin_id,
        fullName: val?.full_name,
        userName: val?.adminuser_name,
        userType: val?.admin_type,
        mobileNo: val?.mobile_no,
        isActive: true,
        action: (
            <div>
                <i className="fa-solid fa-pen-to-square mr-3"></i>
                <i className="fa-solid fa-trash-can text-danger mr-3"></i>
            </div>
        ),
    })) : [];


    const handleSubmit = async (e) => {
        try {
            const response = await callAPI.post(`./admin/createAdmin`, datas);
            if (response.status === 200) {
                getAdminData();
                toast.success('Admin Added Successfully')
            }
        } catch (error) {
            console.error('Error creating admin:', error);
        }
    };



    if (loading) {
        return <Loding />;
    }

    console.log(totalPages)
    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">

                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">User Management</h3>
                                    </div>
                                </div>


                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="appUsersList-tab" data-toggle="tab" href="#appUsersList" role="tab" aria-controls="appUsersList" aria-selected="false">App Users List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
                                        <div className="row">
                                            <div className="col-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <h4 className="card-title mb-0 mr-2">User Entry Form</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <h5 className="card-description text-primary font-weight-bolder">Primary Info</h5>
                                                        <div className="forms-sample">
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label for="exampleInputName1">Full Name <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" name='full_name' value={datas.full_name} onChange={handleChange} id="exampleInputName1" placeholder="Full Name" />
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label for="exampleInputEmail3">User Name <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" name='adminuser_name' value={datas.adminuser_name} onChange={handleChange} id="exampleInputEmail3" placeholder="User Name" />
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label for="exampleInputPassword4">User Password <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" name='admin_password' value={datas.admin_password} onChange={handleChange} id="exampleInputPassword4" placeholder="Password" />
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label for="exampleInputNumber">Mobile Number</label>
                                                                    <input type="number" className="form-control" name='mobile_no' value={datas.mobile_no} onChange={handleChange} id="exampleInputNumber" placeholder="Enter Mobile Number" />
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label for="userType">User Type <span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="userType" name='admin_type' value={datas.admin_type} onChange={handleChange}>
                                                                        <option value='admin'>Admin</option>
                                                                        <option value='management'>Management</option>
                                                                        <option value='user'>User</option>

                                                                    </select>
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label for="userType">Schools <span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="userType" name=''>
                                                                        <option>Admin</option>
                                                                        <option>Management</option>
                                                                        <option>User</option>
                                                                        <option>LBF</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label for="userType">Reporting/Incharge <span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="userType" name='parent_admin_id' value={datas.parent_admin_id} onChange={handleChange}>
                                                                        <option value={1}>Admin</option>
                                                                        <option value={2}>Management</option>
                                                                        <option value={3}>User</option>
                                                                        <option value={4}>LBF</option>
                                                                    </select>
                                                                </div>

                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="userType">Status</label><br />
                                                                    <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                        <label className={`btn btn-light py-2 ${datas.is_active === '1' ? 'active' : ''}`}>
                                                                            <input
                                                                                type="radio"
                                                                                name="is_active"
                                                                                value="1"
                                                                                checked={datas.is_active === '1'}
                                                                                onChange={handleChange}
                                                                            /> Active
                                                                        </label>
                                                                        <label className={`btn btn-light py-2 ${datas.is_active === '0' ? 'active' : ''}`}>
                                                                            <input
                                                                                type="radio"
                                                                                name="is_active"
                                                                                value="0"
                                                                                checked={datas.is_active === '0'}
                                                                                onChange={handleChange}
                                                                            /> Inactive
                                                                        </label>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <button type="submit" className="btn btn-primary mr-2" onClick={() => handleSubmit()}>Submit</button>
                                                            <button className="btn btn-light">Cancel</button>
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
                                                        <p className="card-title">User List</p>
                                                        <div className="row">
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

                                    <div className="tab-pane fade" id="appUsersList" role="tabpanel" aria-labelledby="appUsersList-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <p className="card-title">App User List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Is Active<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="userType">
                                                                                <option>All</option>
                                                                                <option>Active</option>
                                                                                <option>Inactive</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Is OTP Verified<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="userType">
                                                                                <option>All</option>
                                                                                <option>OTP Verified</option>
                                                                                <option>OTP Not Verified</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">App Type <span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="userType">
                                                                                <option>All</option>
                                                                                <option>APS</option>
                                                                                <option>e-Messenger</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 d-flex align-items-center">
                                                                            <div className="">
                                                                                <button type="submit" className="btn btn-primary mr-2">Filter</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="table-responsive">
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

export default UserManagement