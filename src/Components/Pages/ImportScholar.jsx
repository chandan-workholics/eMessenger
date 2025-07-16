import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ImportScholar = () => {
    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;
    const [importStudent, setImportStudent] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [importStudenttwo, setImportStudenttwo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [action, setAction] = useState('insert_only');
    const rowsPerPage = 10;

    const handleCheckboxChange = (e) => {
        setAction(e.target.checked ? 'delete_and_import' : 'insert_only');
    };

    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`${URL}/scholar/getScholarDetail?page=${currentPage}&limit=${rowsPerPage}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const responsetwo = await fetch(`${URL}/scholar/getScholarDetail?page=1&limit=2000`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const result = await response.json();
    //         const resulttwo = await responsetwo.json();
    //         setImportStudent(result.data);
    //         setImportStudenttwo(resulttwo.data);
    //         setTotalPages(Math.ceil(result?.pagination?.totalPages));
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // const handleSearchChange = (e) => {
    //     const value = e.target.value;
    //     setSearchTerm(value);
    //     const lowercasedFilter = value.toLowerCase();
    //     const filteredResults = importStudenttwo.filter(item =>
    //         Object.keys(item).some(key =>
    //             String(item[key]).toLowerCase().includes(lowercasedFilter)
    //         )
    //     );
    //     setImportStudent(filteredResults);
    // };

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
            const responsetwo = await fetch(`${URL}/scholar/getScholarDetail?page=1&limit=2000`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok || !responsetwo.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const resulttwo = await responsetwo.json();
            setImportStudent(result.data);
            setImportStudenttwo(resulttwo.data);
            setTotalPages(Math.ceil(result?.pagination?.totalPages));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value.trim()) {
            fetchData();
            return;
        }
        const lowercasedFilter = value.toLowerCase();
        const filteredResults = importStudenttwo.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(lowercasedFilter)
            )
        );
        setImportStudent(filteredResults);
    };

    const handlePrint = async () => {
        if (!importStudenttwo || importStudenttwo.length === 0) {
            toast.error("No data available to print.");
            return;
        }

        try {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Scholar Data</title>
                        <style>
                            table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            table, th, td {
                                border: 1px solid black;
                            }
                            th, td {
                                text-align: left;
                                padding: 8px;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Student List</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Mobile Number</th>
                                    <th>School Short Name</th>
                                    <th>Student Name</th>
                                    <th>Student DOB</th>
                                    <th>Student Email</th>
                                    <th>Notice Message</th>
                                    <th>Remark</th>
                                    <th>Student Id</th>
                                </tr>
                            </thead>
                            <tbody>
            `);

            importStudenttwo.forEach((val, index) => {
                printWindow.document.write(`
                    <tr>
                        <td>${index + 1}</td>
                        <td>${val?.mobile_no || "N/A"}</td>
                        <td>${val?.sch_short_nm || "N/A"}</td>
                        <td>${val?.student_name || "N/A"}</td>
                        <td>${val?.scholar_dob || "N/A"}</td>
                        <td>${val?.scholar_email || "N/A"}</td>
                        <td>${val?.noticeMsg || "N/A"}</td>
                        <td>${val?.remark || "N/A"}</td>
                        <td>${val?.scholar_no || "N/A"}</td>
                    </tr>
                `);
            });
            printWindow.document.write(`
                            </tbody>
                        </table>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } catch (error) {
            console.error("Error during print operation:", error.message);
            toast.error("An error occurred while trying to print.");
        }
    };

    useEffect(() => {
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
                ;
        }
    };

    // const exportToExcel = () => {
    //     const ws = XLSX.utils.json_to_sheet(importStudenttwo);
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Scholar Data');
    //     XLSX.writeFile(wb, 'Student_List.xlsx');
    // };
    const formatDateToDDMMYYYY = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date)) return dateStr; // if already formatted or invalid
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };


    const exportToExcel = () => {
        const filteredData = importStudenttwo.map((val, index) => ({

            "mobile_no": val?.mobile_no || "N/A",
            "sch_short": val?.sch_short_nm || "N/A",
            "stdn_nm": val?.student_name || "N/A",
            "birth_dt": formatDateToDDMMYYYY(val?.scholar_dob) || "N/A",
            "fth_email": val?.scholar_email || "N/A",
            "stdn_id": val?.scholar_no || "N/A",
            "noticeMsg": val?.noticeMsg || "N/A",
            "remark": val?.remark || "N/A",

        }));

        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Scholar Data');
        XLSX.writeFile(wb, 'Student_List.xlsx');
    };


    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(worksheet, {
                raw: false,
                dateNF: 'dd-mm-yyyy',
            });
            jsonData = jsonData.map(row => {
                const convertedRow = { ...row };
                const rawDate = row.birth_dt;

                if (!rawDate) return convertedRow;

                if (!isNaN(rawDate)) {
                    // If Excel date serial number (number like 45123)
                    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
                    const parsedDate = new Date(excelEpoch.getTime() + rawDate * 86400000);
                    const dd = String(parsedDate.getDate()).padStart(2, '0');
                    const mm = String(parsedDate.getMonth() + 1).padStart(2, '0');
                    const yyyy = parsedDate.getFullYear();
                    convertedRow.birth_dt = `${dd}-${mm}-${yyyy}`;
                } else if (typeof rawDate === 'string') {
                    const date = new Date(rawDate);
                    if (!isNaN(date)) {
                        const dd = String(date.getDate()).padStart(2, '0');
                        const mm = String(date.getMonth() + 1).padStart(2, '0');
                        const yyyy = date.getFullYear();
                        convertedRow.birth_dt = `${dd}-${mm}-${yyyy}`;
                    } else {
                        // Already custom formatted or invalid string
                        convertedRow.birth_dt = rawDate;
                    }
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
            const response = await axios.post(`${URL}/scholar/insertScholarRecord`, {
                action: action,
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
                                        <h3 className="font-weight-bold mr-2">Import Student</h3>
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
                                                </div>
                                                <div className='col-12 '>
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <button type="submit" className="btn btn-primary mr-2 mb-2" onClick={handleSubmit}> Import  </button>
                                                            <button type="submit" className="btn btn-success mr-2 mb-2" onClick={exportToExcel}>Export to Excel</button>
                                                            <button type="submit" className="btn btn-secondary text-white mr-2 mb-2" onClick={handlePrint}>Print</button>
                                                        </div>
                                                        <div className="col-12 col-md-4 mt-2 mt-xl-0">
                                                            <div className="mb-3 position-relative">
                                                                <div className="input-group">
                                                                    <input type="text"
                                                                        placeholder="Search..."
                                                                        value={searchTerm}
                                                                        onChange={handleSearchChange}
                                                                        className="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Student List</p>
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
                                                                    <th>Student DOB</th>
                                                                    <th>Student Email</th>
                                                                    <th>Notice Message</th>
                                                                    <th>Remark</th>
                                                                    <th>Student Id</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {importStudent?.map((val, index) => (
                                                                    <tr key={val?.id}>
                                                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                                                        <td>{val?.mobile_no}</td>
                                                                        <td>{val?.sch_short_nm}</td>
                                                                        <td>{val?.student_name || "Not Available"}</td>
                                                                        <td>{val?.scholar_dob}</td>
                                                                        <td>{val?.scholar_email}</td>
                                                                        <td>{val?.noticeMsg}</td>
                                                                        <td>{val?.remark}</td>
                                                                        <td>{val?.scholar_no}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>


                                            <nav>
                                                <ul className="pagination justify-content-end mb-0 mt-3">
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
    );
};

export default ImportScholar;