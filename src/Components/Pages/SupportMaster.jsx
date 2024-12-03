import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';

const SupportMaster = () => {
    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datas, setDatas] = useState({
        id: '',
        parent_id: '',
        description: '',
        status: '',
    });

    const openModal = (item) => {
        setIsModalOpen(true);
        setDatas({
            id: item.id,
            parent_id: item.parent_id,
            description: item.description,
            status: item.status.toString(),
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({ parent_id: '', description: '', status: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatas({ ...datas, [name]: value });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/supports/get_all_supports?page=${currentPage}&limit=${rowsPerPage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            setdata(result.data);
            setTotalPages(Math.ceil(result.totalCount / rowsPerPage));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await callAPI.put(`/supports/update_support/${datas.id}`, datas);
            if (response.status === 200 || response.status === 201) {
                toast.success('Support Updated Successfully');
                closeModal();
                fetchData();
            } else {
                setError(response.message || 'Something went wrong');
            }
        } catch (error) {
            setError('Error updating support: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loding />;
    }

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Support Master</h3>
                                        <h6 className="text-primary font-weight-bold">NEW</h6>
                                    </div>
                                </div>

                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Support List</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th>Parent ID</th>
                                                                    <th>Send By</th>
                                                                    <th>Description</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.map((val, index) => (
                                                                    <tr key={val?.id}>
                                                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                                                        <td>{val?.parent_id}</td>
                                                                        <td>{val?.send_by || "Not Available"}</td>
                                                                        <td>{val?.description}</td>
                                                                        <td
                                                                            style={{
                                                                                color:
                                                                                    val?.status === 1
                                                                                        ? "green" // Green for Active
                                                                                        : val?.status === 0
                                                                                            ? "grey" // Grey for Not Active
                                                                                            : "red", // Red for Not Available
                                                                            }}
                                                                        >
                                                                            {val?.status === 1
                                                                                ? "Active"
                                                                                : val?.status === 0
                                                                                    ? "Not Active"
                                                                                    : "Not Available"}
                                                                        </td>
                                                                        <td>
                                                                            <button onClick={() => openModal(val)} type="button" className="btn p-2">
                                                                                <i className="fa-solid fa-pen-to-square text-warning"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <nav>
                                                <ul className="pagination justify-content-end">
                                                    <li className="page-item">
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(currentPage - 1)}
                                                            disabled={currentPage === 1}
                                                        >
                                                            Previous
                                                        </button>
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
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(currentPage + 1)}
                                                            disabled={currentPage === totalPages}
                                                        >
                                                            Next
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>

                                            {error && <div className="alert alert-danger">{error}</div>}
                                        </div>
                                    </div>
                                </div>

                                {isModalOpen && (
                                    <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header d-flex align-items-center bg-ffe2e5 py-3">
                                                    <h3 className="modal-title font-weight-bold text-primary">Update Support</h3>
                                                    <button type="button" className="close" onClick={closeModal}>
                                                        <i className="fa-solid fa-xmark fs-3 text-primary"></i>
                                                    </button>
                                                </div>
                                                <div className="modal-body p-3">
                                                    <div className="forms-sample">
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="description"
                                                                name="description"
                                                                value={datas.description}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Status</label><br />
                                                            <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                <label className={`btn btn-light py-2 ${datas.status === '1' ? 'active' : ''}`}>
                                                                    <input
                                                                        type="radio"
                                                                        name="status"
                                                                        id="option1"
                                                                        autoComplete="off"
                                                                        value="1"
                                                                        checked={datas.status === '1'}
                                                                        onChange={handleChange}
                                                                    /> Active
                                                                </label>
                                                                <label className={`btn btn-light py-2 ${datas.status === '0' ? 'active' : ''}`}>
                                                                    <input
                                                                        type="radio"
                                                                        name="status"
                                                                        id="option2"
                                                                        autoComplete="off"
                                                                        value="0"
                                                                        checked={datas.status === '0'}
                                                                        onChange={handleChange}
                                                                    /> Inactive
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer pb-0 px-0">
                                                            <div className="d-flex align-items-center">
                                                                <button type="button" className="btn btn-secondary mr-3" onClick={closeModal}>
                                                                    Close
                                                                </button>
                                                                <button
                                                                    onClick={handleUpdate}
                                                                    type="button"
                                                                    className="btn btn-primary"
                                                                    disabled={loading}
                                                                >
                                                                    {loading ? "Updating..." : "Save Changes"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupportMaster;
