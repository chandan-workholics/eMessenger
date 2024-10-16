import React, { useEffect, useState } from 'react';
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import ExpandRowTable from '../Template/ExpandRowTable';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';


const SubGroupMaster = () => {

    const [datas, setDatas] = useState({ msg_sgroup_name: '', is_active: '1', added_user_id: '1', msg_group_id: '' })
    const [updateSubGroup, setUpdateSubGroup] = useState({});
    const [subGroupList, setSubGroupList] = useState([]);
    const [GroupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 50;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({ msg_sgroup_name: '', is_active: '1', added_user_id: '', msg_group_id: '' });
    };

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

    const fetchGroupData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./msg/getSubGroupDetail?page=1&limit=100`);
            setGroupList(response.data.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await callAPI.post(`./msg/addSubGroup`, datas);
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

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        fetchGroupData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
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

    console.log(error)
    // Table columns
    const columns = [
        { label: 'Sub Group ID', key: 'subGroupId' },
        { label: 'Sub Group Name', key: 'msg_sgroup_name' },
        { label: 'Group Name', key: 'msg_group_name' },
        { label: 'Is Active', key: 'is_active' },
        { label: 'Action', key: 'action' }
    ];

    const rows = [
        { label: 'Added By', key: 'addedBy' },
        { label: 'Added On', key: 'addedOn' },
        { label: 'Edit By', key: 'editBy' },
        { label: 'Edit On', key: 'editOn' },
    ]

    // Table data
    const data = subGroupList ? subGroupList.map((val) => ({
        subGroupId: val?.msg_sgroup_id,
        msg_sgroup_name: val?.msg_sgroup_name,
        msg_group_name: val?.msg_group_mst?.msg_group_name,
        is_active: val?.is_active === 1 ? true : false,
        action: (
            <div>
                <button onClick={() => handleupdateGroup(val)} type="button" className="btn">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
                <i className="fa-solid fa-trash-can text-danger mr-3"></i>
            </div>
        ),
    })) : [];

    const handleupdateGroup = (val) => {
        setUpdateSubGroup(val);
        openModal();
        setDatas({
            msg_sgroup_name: val.msg_sgroup_name,
            is_active: val.is_active,
            addedUserId: val.addedUserId
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await callAPI.put(`./msg/updateSubGroup/${updateSubGroup.msg_sgroup_id}`, datas).then((response) => {
                if (response.status === 201 || response.status === 200) {
                    toast.success("Notice Updated Successfully");
                    closeModal();
                    fetchData();
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
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="exampleInputName1"
                                                                                placeholder="Full Name"
                                                                                name="msg_sgroup_name"
                                                                                value={datas.msg_sgroup_name}
                                                                                onChange={handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Main Group<span className="text-danger">*</span></label>
                                                                            <select className="form-control" name='msg_group_id' id="msg_group_id" onChange={handleChange}>
                                                                                {GroupList?.map((val) => {
                                                                                    return (
                                                                                        <option value={val?.msg_group_id}>{val?.msg_group_name}</option>
                                                                                    )
                                                                                })}

                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label htmlFor="userType">Status</label><br />
                                                                            <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                                <label className={`btn btn-light py-2 ${datas.is_active === '1' ? 'active' : ''}`}>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="options"
                                                                                        id="option1"
                                                                                        autoComplete="off"
                                                                                        checked={datas.is_active === '1'}
                                                                                        onChange={handleChange}
                                                                                    /> Active
                                                                                </label>
                                                                                <label className={`btn btn-light py-2 ${datas.is_active === '0' ? 'active' : ''}`}>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="options"
                                                                                        id="option2"
                                                                                        autoComplete="off"
                                                                                        checked={datas.is_active === '0'}
                                                                                        onChange={handleChange}
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
                                                            <ul className="pagination justify-content-end">
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                                        disabled={currentPage === 1}>Previous</button>
                                                                </li>
                                                                <li className="page-item">
                                                                    <button className="page-link">{currentPage} of {totalPages}</button>
                                                                </li>
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
                                <h3 className="modal-title font-weight-bold text-primary">Update Notice Board</h3>
                                <button type="button" className="close" onClick={closeModal}>
                                    <i class="fa-solid fa-xmark fs-3 text-primary"></i>
                                </button>
                            </div>
                            <div className="modal-body p-3">
                                <form className="forms-sample" onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="msg_group_name">Group Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="msg_group_name"
                                            name="msg_group_name"
                                            value={datas.msg_sgroup_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label><br />
                                        <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                            <label className={`btn btn-light py-2 ${datas.is_active === '1' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="is_active"
                                                    id="option1"
                                                    autoComplete="off"
                                                    value="1"
                                                    checked={datas.is_active === '1'}
                                                    onChange={handleChange}
                                                /> Active
                                            </label>
                                            <label className={`btn btn-light py-2 ${datas.is_active === '0' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="is_active"
                                                    id="option2"
                                                    autoComplete="off"
                                                    value="0"
                                                    checked={datas.is_active === '0'}
                                                    onChange={handleChange}
                                                /> Inactive
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SubGroupMaster