import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import axios from 'axios';

const FeesMaster = () => {
    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;
    const [importFeeStudent, setImportFeeStudent] = useState([]);
    const [importStudenttwo, setImportStudenttwo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [action, setAction] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    const handleCheckboxChange = (e) => {
        // Update action state based on whether checkbox is checked or not
        setAction(e.target.checked ? true : false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/fees/getFeesDisplayDetail?page=${currentPage}&limit=${rowsPerPage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const responsetwo = await fetch(`${URL}/scholar/getScholarDetail?page=1&limit=2000`, {
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
            const resulttwo = await responsetwo.json();
            setImportFeeStudent(result.data);
            setImportStudenttwo(resulttwo.data);
            setTotalPages(Math.ceil(result?.pagination?.totalPages));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(importStudenttwo);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Scholar Data');
        XLSX.writeFile(wb, 'Scholar_Data.xlsx');
    };

    // upload excel data 
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the sheet data to JSON
            let jsonData = XLSX.utils.sheet_to_json(worksheet, {
                raw: false, // Parse date as text
                dateNF: 'yyyy-mm-dd', // Optional: specify a date format
            });

            // Handle date conversion explicitly (if needed)
            jsonData = jsonData.map(row => {
                const convertedRow = { ...row };

                // Check if a date field exists and convert it
                if (convertedRow.duedate && !isNaN(convertedRow.duedate)) {
                    convertedRow.duedate = new Date(Math.round((convertedRow.duedate - 25569) * 86400 * 1000))
                        .toISOString()
                        .split('T')[0]; // Convert to yyyy-mm-dd
                }

                return convertedRow;
            });

            setExcelData(jsonData);
        };

        reader.readAsBinaryString(file);
    };
    // Function to submit data to API
    const handleSubmit = async () => {
        if (excelData.length === 0) {
            toast.error('Please upload a valid Excel file.');
            return;
        }

        try {
            const response = await axios.post('http://206.189.130.102:3550/api/fees/addfeesDisplay', {
                deleteExisting: action,
                data: excelData,
            }, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                toast.success('Data imported successfully!');
                fetchData();
            } else {
                toast.error('Failed to import data.');
            }
        } catch (error) {
            toast.error('An error occurred while uploading the data.');
            console.error(error);
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
                                        <h3 className="font-weight-bold mr-2">Fees Overdue Student</h3>
                                        <h6 className="text-primary font-weight-bold">NEW</h6>
                                    </div>
                                </div>

                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <div className="row forms-sample">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>File upload</label>
                                                        <input type="file" className="file-upload-default" />
                                                        <div className="input-group col-xs-12">
                                                            <input type="file" className="form-control file-upload-info"
                                                                placeholder="Upload File" accept=".xlsx, .xls"
                                                                onChange={handleFileUpload} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            <label>Is Delete All Old Record First?</label>
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input ml-2"
                                                                id="exampleCheck1"
                                                                onChange={handleCheckboxChange} // Set action on checkbox change
                                                            />
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={handleSubmit}>
                                                        Import
                                                    </button>
                                                    <button type="submit" className="btn btn-success mr-2" onClick={exportToExcel}>Export to Excel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Pending Fees List</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-hover" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Student ID</th>
                                                                    <th>Session</th>
                                                                    <th>Term</th>
                                                                    <th>Outstanding Fee</th>
                                                                    <th>Due Date</th>
                                                                    <th> Fees Status</th>
                                                                    <th>Created At</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {importFeeStudent?.map((val, index) => (
                                                                    <tr key={val.id}>
                                                                        <td>{val.fees_display_id}</td>
                                                                        <td>{val.scholar_no}</td>
                                                                        <td>{val.session_detail}</td>
                                                                        <td>{val.term}</td>
                                                                        <td>{val.outstandingfees}</td>
                                                                        <td>{val.duedate}</td>
                                                                        <td>{val.feesstatus}</td>
                                                                        <td>{new Date(val.createdAt).toLocaleDateString('en-GB')}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pagination Controls */}
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
                                            {error && <div className="alert alert-danger">{error}</div>}
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

export default FeesMaster