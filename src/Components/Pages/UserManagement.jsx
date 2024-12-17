import React, { useState, useEffect } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import SortableTable from '../Template/SortableTable';
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import callAPI from '../../commonMethod/api';
import Multiselect from "multiselect-react-dropdown";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


const UserManagement = () => {

    const [datas, setDatas] = useState({
        full_name: '',
        adminuser_name: '',
        admin_password: '',
        is_active: '',
        admin_type: '',
        mobile_no: '',
        school_id: '',
        added_admin_id: '1',
        parent_admin_id: '',
    })
    const [updateUserManagement, setUpdateUserManagement] = useState({});
    const [admindata, setAdminData] = useState()
    const [userData, setUserData] = useState()
    const [deleteid, Setdeleteid] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [schoolList, setSchoolList] = useState([]);
    const [school, setschool] = useState([]);
    const [editschool, seteditschool] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    const [currentPage2, setCurrentPage2] = useState(1);
    const [totalPages2, setTotalPages2] = useState(0);
    const rowsPerPage2 = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);


    const [activeFilter, setActiveFilter] = useState('All');
    const [otpVerifiedFilter, setOtpVerifiedFilter] = useState('All');

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/school/getSchool?page=1&limit=200`);
            setSchoolList(response.data.data || []);
        } catch (error) {
            console.error('Error fetching school data:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchAllData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/school/getSchool?limit=0`);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching school data:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleExport = async () => {
        const allData = await fetchAllData();
        console.log(allData, "allData");
        const formattedData = admindata.data.map((val) => ({
            userId: val?.admin_id,
            fullName: val?.full_name,
            userName: val?.adminuser_name,
            userType: val?.admin_type,
            mobileNo: val?.mobile_no,
            school: val?.schoolDetails
                ? val.schoolDetails.map((school) => school.sch_short_nm).join(", ")
                : "N/A",
            isActive: val?.is_active === 1 ? "Yes" : "No",
        }));
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const csvContent = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'User_Management.csv');
    };


    const handlePrint = async () => {
        try {
            const allData = await fetchAllData();
            const formattedData = admindata.data.map((val) => ({
                userId: val?.admin_id,
                fullName: val?.full_name,
                userName: val?.adminuser_name,
                userType: val?.admin_type,
                mobileNo: val?.mobile_no,
                school: val?.schoolDetails
                    ? val.schoolDetails.map((school) => school.sch_short_nm).join(", ")
                    : "N/A",
                isActive: val?.is_active === 1 ? "Yes" : "No",
            }));
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                    <head>
                        <title>User Management</title>
                    </head>
                    <body>
                        <h1>User List</h1>
                        <table border="1" style="width:100%; text-align:left; border-collapse:collapse;">
                            <tr>
                                <th>User ID</th>
                                <th>Full Name</th>
                                <th>User Name</th>
                                <th>User Type</th>
                                <th>Mobile No.</th>
                                <th>School</th>
                                <th>Is Active</th>
                            </tr>
            `);
            formattedData.forEach((row) => {
                printWindow.document.write(`
                    <tr>
                        <td>${row.userId}</td>
                        <td>${row.fullName}</td>
                        <td>${row.userName}</td>
                        <td>${row.userType}</td>
                        <td>${row.mobileNo}</td>
                        <td>${row.school}</td>
                        <td>${row.isActive}</td>
                    </tr>
                `);
            });
            printWindow.document.write(`
                        </table>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } catch (error) {
            console.error("Error printing data:", error.message);
            alert("An error occurred while attempting to print data. Please try again.");
        }
    };



    useEffect(() => {
        fetchData();
    }, []);// eslint-disable-next-line react-hooks/exhaustive-deps

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({
            full_name: '',
            adminuser_name: '',
            admin_password: '',
            is_active: '',
            admin_type: '',
            mobile_no: '',
            added_admin_id: '1',
            parent_admin_id: '',
            school_id: '',
        });
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await callAPI.post(`./admin/createAdmin`, {
                full_name: datas.full_name,
                adminuser_name: datas.adminuser_name,
                admin_password: datas.admin_password,
                is_active: datas.is_active,
                admin_type: datas.admin_type,
                mobile_no: datas.mobile_no,
                added_admin_id: datas.added_admin_id,
                parent_admin_id: datas.parent_admin_id,
                school_id: school?.map((val) => val?.sch_id),
            });
            if (response.status >= 200 && response.status < 300) {
                getAdminData();
                toast.success('User added successfully');
            } else {
                toast.error(response?.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };

    const getAppUserList = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./scholar/get_full_list_app_active_users_list?page=${currentPage}&limit=${rowsPerPage}&active=${activeFilter !== 'All' ? (activeFilter === 'Active' ? 1 : 0) : ''}&otpVerified=${otpVerifiedFilter !== 'All' ? (otpVerifiedFilter === 'OTP Verified' ? 1 : 0) : ''}`);
            setUserData(response?.data);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalPages));
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };



    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        if (id === "activeFilter") {
            setActiveFilter(value);
        } else if (id === "otpVerifiedFilter") {
            setOtpVerifiedFilter(value);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        getAppUserList(); // Call the function to fetch the filtered list
    };


    const getAdminData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./admin/getAllAdmin?page=${currentPage2}&limit=${rowsPerPage2}`);
            setAdminData(response?.data);
            setTotalPages2(Math.ceil(response?.data?.pagination?.totalPages / rowsPerPage));
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAdminData();
        getAppUserList();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageChange2 = (page) => {
        if (page > 0 && page <= totalPages2) {
            setCurrentPage2(page);
        }
    };

    if (loading) {
        return <Loding />;
    }


    console.log(error)
    // Table columns
    const columns = [
        { label: 'User ID', key: 'userId' },
        { label: 'Full Name', key: 'fullName' },
        { label: 'User Name', key: 'userName' },
        { label: 'User Type', key: 'userType' },
        { label: 'Mobile No.', key: 'mobileNo' },
        { label: 'School', key: 'school' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' }
    ];

    const data = admindata ? admindata?.data?.map((val) => ({
        userId: val?.admin_id,
        fullName: val?.full_name,
        userName: val?.adminuser_name,
        userType: val?.admin_type,
        mobileNo: val?.mobile_no,
        school: val?.schoolDetails
            ? val.schoolDetails.map((school) => school.sch_short_nm).join(", ")
            : "N/A",
        isActive: val?.is_active == 1 ? "Yes" : "No",
        action: (
            <div>
                <button onClick={() => handleupdateUser(val)} type="button" className="btn p-2">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
                <button onClick={() => handleDelete(val?.admin_id)} type="button" className="btn p-2">
                    <i className="fa-solid fa-trash-can text-danger"></i>
                </button>
            </div>
        ),
    })) : [];
    const handleupdateUser = (val) => {
        setUpdateUserManagement(val);
        openModal();
        setDatas({
            full_name: val.full_name,
            adminuser_name: val.adminuser_name,
            admin_password: val.admin_password,
            mobile_no: val.mobile_no,
            school: val.schoolList,
            admin_type: val.admin_type,
            is_active: val.is_active,
            school_id: editschool?.map((val) => val?.sch_id),
        });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await callAPI.put(`./admin/updateProfileDetail/${updateUserManagement.admin_id}`, datas).then((response) => {
                if (response.status === 201 || response.status === 200) {
                    toast.success("User Updated Successfully");
                    closeModal();
                    getAdminData();
                } else {
                    setError(response.message || 'Something went wrong');
                }
            });
        } catch (error) {
            setError('Error updating notice: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Setdeleteid(id);
        setIsDeleteModalOpen(true)
    };

    function deleteItem(id) {
        callAPI.del(`./admin/deleteAdmin/${id}`).then(async (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success('Delete Item Successfully');
                closeDeleteModal();
                getAdminData();
            }
            else {
                toast.error('something went wrong');
            }
        });
    }

    // Table columns
    const appColumns = [
        { label: 'User ID', key: 'userId' },
        { label: 'Mobile No.', key: 'mobileNo' },
        { label: 'School.', key: 'School' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Activated Time', key: 'activatedTime' },
        { label: 'Last Visit Time', key: 'lastVisitTime' },

        { label: 'Mobile Type', key: 'mobileType' },
        { label: 'App Version', key: 'appVersion' },
        { label: 'Ip Address', key: 'ipAddress' }
    ];

    const appUserData = userData ? userData?.data?.map((val) => ({
        userId: val?.parents_id,
        mobileNo: val?.mobile_no,
        School: val?.sch_short_nm,
        isActive: val?.is_active == 1 ? "Yes" : "No",


        activatedTime: val?.active_datetime
            ? (() => {
                const date = new Date(val?.active_datetime);
                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
                const year = date.getUTCFullYear();
                let hours = String(date.getUTCHours()).padStart(2, '0');
                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
                hours = hours % 12;
                hours = hours ? String(hours).padStart(2, '0') : '12'; // 12:00 AM or 12:00 PM

                return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
            })()
            : '',

        lastVisitTime: val?.last_visit_on
            ? (() => {
                const date = new Date(val?.last_visit_on);
                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
                const year = date.getUTCFullYear();
                let hours = String(date.getUTCHours()).padStart(2, '0');
                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
                hours = hours % 12;
                hours = hours ? String(hours).padStart(2, '0') : '12'; // 12:00 AM or 12:00 PM

                return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
            })()
            : '',

        mobileType: val?.mobile_platform,
        appVersion: val?.mobile_info,
        ipAddress: val?.mobile_uuid,
    })) : [];



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
                                                    <a className="nav-link " id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="appUsersList-tab" data-toggle="tab" href="#appUsersList" role="tab" aria-controls="appUsersList" aria-selected="false">App Users List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade " id="add" role="tabpanel" aria-labelledby="add-tab">
                                        <div className="row">
                                            <div className="col-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <h4 className="card-title mb-0 mr-2">User Entry Form</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <h5 className="card-description text-primary font-weight-bolder">Primary Info</h5>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample" onSubmit={handleSubmit}>
                                                                    <div className="row">
                                                                        <div className="col-md-6 form-group">
                                                                            <label for="exampleInputName1">Full Name <span className="text-danger">*</span></label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="exampleInputName1"
                                                                                placeholder="Full Name"
                                                                                name='full_name'
                                                                                value={datas.full_name}
                                                                                onChange={handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6 form-group">
                                                                            <label for="exampleInputEmail3">User Name <span className="text-danger">*</span></label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="exampleInputEmail3"
                                                                                placeholder="User Name"
                                                                                name='adminuser_name'
                                                                                value={datas.adminuser_name}
                                                                                onChange={handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6 form-group">
                                                                            <label for="exampleInputPassword4">User Password <span className="text-danger">*</span></label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="exampleInputPassword4"
                                                                                placeholder="Password"
                                                                                name='admin_password'
                                                                                value={datas.admin_password}
                                                                                onChange={handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6 form-group">
                                                                            <label for="exampleInputNumber">Mobile Number</label>
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                id="exampleInputNumber"
                                                                                placeholder="Enter Mobile Number"
                                                                                name='mobile_no'
                                                                                value={datas.mobile_no}
                                                                                onChange={handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6 form-group">
                                                                            <label for="userType">User Type <span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="userType" name='admin_type' value={datas.admin_type} onChange={handleChange}>
                                                                                <option value='' selected disabled>Select Option</option>
                                                                                <option value='admin'>Admin</option>
                                                                                <option value='management'>Management</option>
                                                                                <option value='user'>User</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-6 form-group">
                                                                            <label htmlFor="schools">Schools<span className="text-danger">*</span></label>
                                                                            <Multiselect className='inputHead'
                                                                                onRemove={(event) => {
                                                                                    console.log(event);
                                                                                }}
                                                                                onSelect={(event) => {
                                                                                    setschool(event);
                                                                                }}
                                                                                required
                                                                                options={schoolList}
                                                                                displayValue="sch_nm"
                                                                                showCheckbox />
                                                                        </div>
                                                                        {datas.admin_type === "user" && (
                                                                            <div className="col-md-6 form-group">
                                                                                <label for="userType">Reporting/Incharge <span className="text-danger">*</span></label>
                                                                                <select className="form-control" id="userType" name='parent_admin_id' value={datas.parent_admin_id} onChange={handleChange}>
                                                                                    <option value='' selected disabled>Select Option</option>
                                                                                    {admindata?.data?.map((val) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option value={val?.admin_id}>{val?.full_name}</option>
                                                                                            </>
                                                                                        )
                                                                                    })}

                                                                                </select>
                                                                            </div>
                                                                        )}

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
                                                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                                    <button type="button" className="btn btn-light" onClick={() => {/* Handle Cancel */ }}>Cancel</button>
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
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <p className="card-title mb-0">User List</p>
                                                            <div className="d-flex justify-content-center mb-3">
                                                                <button className=" border-0 bg-transparent px-2 mr-2" onClick={handlePrint}><i class="fa-solid fa-print text-primary"></i>
                                                                    <br /><span className='' style={{ fontSize: "12px" }}>Print</span>
                                                                </button>
                                                                <button className=" border-0 bg-transparent px-2" onClick={handleExport}><i class="fa-solid fa-file-export text-success"></i>
                                                                    <br /><span className='' style={{ fontSize: "12px" }}>Export</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <SortableTable columns={columns} data={data} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <nav>
                                                            <ul className="pagination justify-content-end">
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange2(currentPage2 - 1)}
                                                                        disabled={currentPage2 === 1}>Previous</button>
                                                                </li>
                                                                {Array.from({ length: totalPages2 }, (_, index) => (
                                                                    <li
                                                                        key={index + 1}
                                                                        className={`page-item ${currentPage2 === index + 1 ? 'active' : ''}`}
                                                                    >
                                                                        <button
                                                                            className="page-link"
                                                                            onClick={() => handlePageChange2(index + 1)}
                                                                        >
                                                                            {index + 1}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange2(currentPage2 + 1)}
                                                                        disabled={currentPage2 === totalPages2}>Next</button>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show active" id="appUsersList" role="tabpanel" aria-labelledby="appUsersList-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <p className="card-title">App User List</p>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <label htmlFor="activeFilter">Is Active<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="activeFilter" onChange={handleFilterChange}>
                                                                                <option>Select</option>
                                                                                <option>All</option>
                                                                                <option>Active</option>
                                                                                <option>Inactive</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label htmlFor="otpVerifiedFilter">Is OTP Verified<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="otpVerifiedFilter" onChange={handleFilterChange}>
                                                                                <option>Select</option>
                                                                                <option>All</option>
                                                                                <option>OTP Verified</option>
                                                                                <option>OTP Not Verified</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 d-flex align-items-center">
                                                                            <div className="">
                                                                                <button type="submit" onClick={handleFilterSubmit} className="btn btn-primary mr-2">Filter</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <SortableTable columns={appColumns} data={appUserData} />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <nav>
                                                            <ul className="pagination justify-content-end">
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                                        disabled={currentPage === 1}>Previous</button>
                                                                </li>
                                                                {Array.from({ length: totalPages }, (_, index) => (
                                                                    <li
                                                                        key={index + 1}
                                                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                                                    >
                                                                        <button
                                                                            className="page-link"
                                                                            onClick={() => handlePageChange(index + 1)}
                                                                        >
                                                                            {index + 1}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}
                                                                        disabled={currentPage === totalPages}>Next</button>
                                                                </li>
                                                            </ul>
                                                        </nav>
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

            {isModalOpen && (
                <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex align-items-center bg-ffe2e5 py-3">
                                <h4 className="modal-title font-weight-bold text-primary">Update User Details</h4>
                                <button type="button" className="close" onClick={closeModal}>
                                    <i class="fa-solid fa-xmark fs-3 text-primary"></i>
                                </button>
                            </div>
                            <div className="modal-body p-3">
                                <form className="forms-sample" onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label for="exampleInputName1">Full Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputName1"
                                                placeholder="Full Name"
                                                name='full_name'
                                                value={datas.full_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label for="exampleInputEmail3">User Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail3"
                                                placeholder="User Name"
                                                name='adminuser_name'
                                                value={datas.adminuser_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label for="exampleInputPassword4">User Password <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword4"
                                                placeholder="Password"
                                                name='admin_password'
                                                value={datas.admin_password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label for="exampleInputNumber">Mobile Number</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="exampleInputNumber"
                                                placeholder="Enter Mobile Number"
                                                name='mobile_no'
                                                value={datas.mobile_no}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label for="userType">User Type <span className="text-danger">*</span></label>
                                            <select className="form-control" id="userType" name='admin_type' value={datas.admin_type} onChange={handleChange}>
                                                <option value='' selected disabled>Select Option</option>
                                                <option value='admin'>Admin</option>
                                                <option value='management'>Management</option>
                                                <option value='user'>User</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="schools">Schools<span className="text-danger">*</span></label>
                                            <Multiselect className='inputHead'
                                                onRemove={(event) => {
                                                    console.log(event);
                                                }}
                                                onSelect={(event) => {
                                                    seteditschool(event);
                                                }}
                                                required
                                                options={schoolList}
                                                displayValue="sch_nm"
                                                showCheckbox />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label for="userType">Reporting/Incharge <span className="text-danger">*</span></label>
                                            <select className="form-control" id="userType" name='parent_admin_id' value={datas.parent_admin_id} onChange={handleChange}>
                                                <option value='' selected disabled>Select Option</option>
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
                                    <div className="modal-footer pb-0 px-0">
                                        <div className="d-flex align-items-center">
                                            <button type="button" className="btn btn-secondary mr-3" onClick={closeModal}>Close</button>
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                {loading ? 'Updating...' : 'Update'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex align-items-center bg-ffe2e5 py-3">
                                <h4 className="modal-title font-weight-bold text-primary">Warning!</h4>
                                <button type="button" className="close" onClick={closeDeleteModal}>
                                    <i class="fa-solid fa-xmark fs-3 text-primary"></i>
                                </button>
                            </div>
                            <div className="modal-body p-3">
                                <div className="modal-body">
                                    <h5 className="text-primary text-center">Do you want to permanently delete?</h5>
                                    <img src="images/deleteWarning.png" alt="" className="w-100 m-auto" />
                                </div>
                                <div className="modal-footer pb-0">
                                    <div className="d-flex align-items-center">
                                        <button type="button" className="btn btn-danger mr-3" onClick={() => deleteItem(deleteid)}>Yes</button>
                                        <button type="button" className="btn btn-outline-danger" onClick={closeDeleteModal}>No</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserManagement