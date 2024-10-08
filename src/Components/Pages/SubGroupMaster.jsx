import React, { useEffect, useState } from 'react';
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import ExpandRowTable from '../Template/ExpandRowTable';
import { toast } from 'react-toastify';
import callAPI from '../../commonMethod/api';


const SubGroupMaster = () => {


    const [subGroupList, setSubGroupList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 50;


    const [groupName, setGroupName] = useState([]);
    const [subGroupId, setSubGroupId] = useState('');
    const [subGroupName, setSubGroupName] = useState('');
    const [isActive, setIsActive] = useState('1');
    const [addedUserId] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            msg_sgroup_name: subGroupName,
            msg_group_id: subGroupId,
            is_active: isActive,
            added_user_id: addedUserId,
        };

        try {
            const response = await callAPI.post(`./msg/addSubGroup`, data);
            if (response.status >= 200 && response.status < 300) {
                fetchData();
                toast.success('Group master added successfully');
            } else {
                toast.error('Failed to add group master');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };



    const fetchGroupData = async () => {
        setLoading(true);
        try {
            const response = await callAPI.get(`./msg/getGroupDetail?page=1&limit=50`);
            setGroupName(response?.data?.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        fetchData();
        fetchGroupData();
    }, [currentPage]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await callAPI.get(`./msg/getSubGroupDetail?page=${currentPage}&limit=${rowsPerPage}`);
            setSubGroupList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.limit / rowsPerPage));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };




    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <Loding />;
    }

    // Table columns
    const columns = [
        { label: 'Sub Group ID', key: 'subGroupId' },
        { label: 'Sub Group Name', key: 'SunGroupName' },
        { label: 'Group Name', key: 'groupName' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' } // Changed to lowercase for consistency
    ];

    const rows = [
        { label: 'Added By', key: 'addedBy' },
        { label: 'Added On', key: 'addedOn' },
        { label: 'Edit By', key: 'editBy' },
        { label: 'Edit On', key: 'editOn' },
    ]

    // Table data
    const data = subGroupList ? subGroupList.map((subGroup) => ({
        subGroupId: subGroup?.msg_sgroup_id,
        SunGroupName: subGroup?.msg_sgroup_name,
        groupName: subGroup?.msg_group_mst?.msg_group_name,
        isActive: subGroup?.is_active == 1 ? true : false,
        action: (
            <div>
                <i className="fa-solid fa-pen-to-square mr-3"></i>
                <i className="fa-solid fa-trash-can text-danger mr-3"></i>
            </div>
        ),
    })) : [];

    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">


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
                                                                <form className="forms-sample" onSubmit={handleSubmit}>
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="exampleInputName1">Sub Group Name<span className="text-danger">*</span></label>
                                                                            <input type="text"
                                                                                className="form-control"
                                                                                id="exampleInputName1"
                                                                                placeholder="Full Name"
                                                                                value={subGroupName}
                                                                                onChange={(e) => setSubGroupName(e.target.value)}
                                                                                required />
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Main Group<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="userType" onClick={(e) => setSubGroupId(e.target.value)}>
                                                                                {groupName?.map((val) => {
                                                                                    return (
                                                                                        <option value={val?.msg_group_id}>{val?.msg_group_name}</option>
                                                                                    )
                                                                                })}

                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label htmlFor="userType">Status</label><br />
                                                                            <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                                <label className={`btn btn-light py-2 ${isActive === '1' ? 'active' : ''}`}>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="options"
                                                                                        id="option1"
                                                                                        autoComplete="off"
                                                                                        checked={isActive === '1'}
                                                                                        onChange={() => setIsActive('1')}
                                                                                    /> Active
                                                                                </label>
                                                                                <label className={`btn btn-light py-2 ${isActive === '0' ? 'active' : ''}`}>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="options"
                                                                                        id="option2"
                                                                                        autoComplete="off"
                                                                                        checked={isActive === '0'}
                                                                                        onChange={() => setIsActive('0')}
                                                                                    /> Inactive
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                                    <button className="btn btn-light" >Cancel</button>
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
                                                                    <ExpandRowTable columns={columns} rows={rows} data={data} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <nav>
                                                            <ul class="pagination justify-content-end">
                                                                <li class="page-item">
                                                                    <button class="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                                        disabled={currentPage === 1}>Previous</button>
                                                                </li>
                                                                <li class="page-item">
                                                                    <button class="page-link">{currentPage} of {totalPages}</button>
                                                                </li>
                                                                <li class="page-item">
                                                                    <button class="page-link" onClick={() => handlePageChange(currentPage + 1)}
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
        </>
    )
}

export default SubGroupMaster