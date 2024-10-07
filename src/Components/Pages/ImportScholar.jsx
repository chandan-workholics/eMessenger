import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import SidebarSettingPannel from '../Template/SidebarSettingPannel';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import * as XLSX from 'xlsx';

const ImportScholar = () => {
    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;
    const [importStudent, setImportStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/scholar/getScholarDetail?page=${currentPage}&limit=${rowsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setImportStudent(result.data);
                setTotalPages(Math.ceil(result.totalCount / rowsPerPage));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(importStudent);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Scholar Data');
        XLSX.writeFile(wb, 'Scholar_Data.xlsx');
    };

    if (loading) {
        return <Loding />;
    }



    return (
        <>
            <div className="container-scroller">

                <Navbar />

                <div className="container-fluid page-body-wrapper">
                    <SidebarSettingPannel />

                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Scholar Import</h3>
                                        <h6 className="text-primary font-weight-bold">NEW</h6>
                                    </div>
                                </div>

                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <form className="row forms-sample">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>File upload</label>
                                                        <input type="file" className="file-upload-default" />
                                                        <div className="input-group col-xs-12">
                                                            <input type="file" className="form-control file-upload-info" disabled="" placeholder="Upload Image" />
                                                            <span className="input-group-append">
                                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="form-check form-check-flat form-check-primary mb-4">
                                                        <label className="form-check-label">
                                                            Is Column Title in First Row?
                                                            <input type="checkbox" className="form-check-input" />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-flat form-check-primary mb-4">
                                                        <label className="form-check-label">
                                                            Is Delete All Old Record First?
                                                            <input type="checkbox" className="form-check-input" />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mr-2">Import</button>
                                                    <button type="submit" className="btn btn-success mr-2" onClick={exportToExcel}>Export to Excel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Advanced Table</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th>Mobile Number</th>
                                                                    <th>School Short Name</th>
                                                                    <th>Student Name</th>
                                                                    <th>Student Id</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {importStudent.map((val, index) => (
                                                                    <tr key={val.id}>
                                                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                                                        <td>{val.mobile_no}</td>
                                                                        <td>{val.sch_short_nm}</td>
                                                                        <td>{val.student_name || ''}</td>
                                                                        <td>{val.scholar_no}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pagination Controls */}
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
        </>
    );
};

export default ImportScholar;
