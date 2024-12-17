import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const SupportMaster = () => {
    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setdata] = useState([]);

    const [deleteid, Setdeleteid] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datas, setDatas] = useState({
        id: '',
        parent_id: '',
        description: '',
        status: '',
        remark: '',
        added_date: "",
        added_user_id: '',
        edited_date: "",
        edited_user_id: '',
        send_by: ""
    });

    const openModal = (item) => {
        setIsModalOpen(true);
        setDatas({
            id: item.id,
            parent_id: item.parent_id,
            description: item.description,
            status: item.status.toString(),
            remark: item.remark,
            added_date: item.added_date,
            added_user_id: item.added_user_id,
            edited_date: item.edited_date,
            edited_user_id: item.edited_user_id,
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({ parent_id: '', description: '', status: '', remark: '', added_date: "", added_user_id: '', edited_date: "", edited_user_id: '', });
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

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/supports/get_all_supports?limit=0`, {
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
            return response.data.data || [];

        } catch (error) {
            console.error('Error fetching school data:', error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };
    const formatDate = (dateString) => {
        if (!dateString) return "Not Available";
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleExport = async () => {
        const allData = await fetchAllData();
        const formattedData = data.map((val, index) => ({
            index: index + 1,
            parent_id: val?.parent_id || "Not Available",
            send_by: val?.send_by || "Not Available",
            description: val?.description || "Not Available",
            remark: val?.remark || "Not Available",
            added_date: formatDate(val?.added_date),
            edited_date: formatDate(val?.edited_date),
            status: val?.status === 1 ? "Active" : val?.status === 0 ? "Not Active" : "Not Available"
        }));
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const csvContent = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Support_Master.csv');
    };

    const handlePrint = async () => {
        const allData = await fetchAllData();
        const formattedData = data.map((val, index) => ({
            index: index + 1,
            parent_id: val?.parent_id || "Not Available",
            send_by: val?.send_by || "Not Available",
            description: val?.description || "Not Available",
            remark: val?.remark || "Not Available",
            added_date: formatDate(val?.added_date),
            edited_date: formatDate(val?.edited_date),
            status: val?.status === 1 ? "Active" : val?.status === 0 ? "Not Active" : "Not Available"
        }));

        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Support List</title></head><body>');
        printWindow.document.write('<h1>Support List</h1>');
        printWindow.document.write('<table border="1" style="width:100%; text-align:left; border-collapse:collapse;">');
        printWindow.document.write('<tr><th>S.No</th><th>Parent ID</th><th>Send By</th><th>Description</th><th>Remark</th><th>Issue Date</th><th>Resolved Date</th><th>Status</th></tr>');

        formattedData.forEach((row) => {
            printWindow.document.write(
                `<tr>
                    <td>${row.index}</td>
                    <td>${row.parent_id}</td>
                    <td>${row.send_by}</td>
                    <td>${row.description}</td>
                    <td>${row.remark}</td>
                    <td>${row.added_date}</td>
                    <td>${row.edited_date}</td>
                    <td>${row.status}</td>
                </tr>`
            );
        });

        printWindow.document.write('</table></body></html>');
        printWindow.document.close();
        printWindow.print();
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

    const handleDelete = (id) => {
        Setdeleteid(id);
        setIsDeleteModalOpen(true)
    };


    function deleteItem(id) {
        callAPI.del(`./supports/delete_support/${id}`).then(async (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success('Delete Item Successfully');
                closeDeleteModal();
                fetchData();
            }
            else {
                toast.error('something went wrong');
            }
        });
    }

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
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <p className="card-title mb-0">Support List</p>
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
                                                        <table className="table table-hover" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th>Parent ID</th>
                                                                    <th>Send By</th>
                                                                    <th>Description</th>
                                                                    <th>Remark</th>
                                                                    <th>Issues date</th>
                                                                    <th>Resolved date</th>
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
                                                                        <td>{val?.remark || "Not Available"}</td>
                                                                        <td>
                                                                            {val?.added_date
                                                                                ? (() => {
                                                                                    const date = new Date(val?.added_date);
                                                                                    const day = String(date.getUTCDate()).padStart(2, '0');
                                                                                    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
                                                                                    const year = date.getUTCFullYear();
                                                                                    return `${day}/${month}/${year}`;
                                                                                })()
                                                                                : "Not Available"}
                                                                        </td>
                                                                        <td>
                                                                            {val?.edited_date
                                                                                ? (() => {
                                                                                    const date = new Date(val?.edited_date);
                                                                                    const day = String(date.getUTCDate()).padStart(2, '0');
                                                                                    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
                                                                                    const year = date.getUTCFullYear();
                                                                                    return `${day}/${month}/${year}`;
                                                                                })()
                                                                                : "Not Available"}
                                                                        </td>

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
                                                                            <button onClick={() => handleDelete(val?.id)} type="button" className="btn p-2">
                                                                                <i className="fa-solid fa-trash-can text-danger"></i>
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
                                                            <label htmlFor="remark">Remark</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="remark"
                                                                name="remark"
                                                                value={datas.remark}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="edited_date">Resolved date</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="edited_date"
                                                                name="edited_date"
                                                                value={datas.edited_date}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupportMaster;
