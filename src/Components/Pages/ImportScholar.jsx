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
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [action, setAction] = useState('insert_only');

  // frontend pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // ✅ Fetch all data only once
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/scholar/getScholarDetail?page=1&limit=20000`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setImportStudent(result.data || []);
      setFilteredData(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handle search (search everything deeply)
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const lower = value.toLowerCase().trim();
    if (!lower) {
      setFilteredData(importStudent);
      setCurrentPage(1);
      return;
    }

    const filtered = importStudent.filter((item) =>
      Object.values(item).some((val) => {
        if (val == null) return false;
        const textValue =
          typeof val === 'object' ? JSON.stringify(val).toLowerCase() : String(val).toLowerCase();
        return textValue.includes(lower);
      })
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // ✅ Paginate frontend data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // ✅ Export to Excel
  const formatDateToDDMMYYYY = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const exportToExcel = () => {
    const dataToExport = filteredData.map((val) => ({
      mobile_no: val?.student_family_mobile_number || 'N/A',
      sch_short: val?.sch_short_nm || 'N/A',
      stdn_nm: val?.student_name || 'N/A',
      birth_dt: formatDateToDDMMYYYY(val?.student_dob) || 'N/A',
      fth_email: val?.student_email || 'N/A',
      stdn_id: val?.student_number || 'N/A',
      noticeMsg: val?.noticeMsg || 'N/A',
      remark: val?.remark || 'N/A',
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Scholar Data');
    XLSX.writeFile(wb, 'Student_List.xlsx');
  };

  // ✅ Handle print
  const handlePrint = () => {
    if (!filteredData.length) {
      toast.error('No data available to print.');
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Scholar Data</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            table, th, td { border: 1px solid black; }
            th, td { text-align: left; padding: 8px; }
            th { background-color: #f2f2f2; }
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

    filteredData.forEach((val, index) => {
      printWindow.document.write(`
        <tr>
          <td>${index + 1}</td>
          <td>${val?.student_family_mobile_number || 'N/A'}</td>
          <td>${val?.sch_short_nm || 'N/A'}</td>
          <td>${val?.student_name || 'N/A'}</td>
          <td>${val?.student_dob || 'N/A'}</td>
          <td>${val?.student_email || 'N/A'}</td>
          <td>${val?.noticeMsg || 'N/A'}</td>
          <td>${val?.remark || 'N/A'}</td>
          <td>${val?.student_number || 'N/A'}</td>
        </tr>
      `);
    });

    printWindow.document.write(`</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  // ✅ File Upload & Submit (same as before)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${URL}/scholar/insertScholarRecord`,
        { action, data: excelData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success('Data imported successfully!');
        fetchData();
      } else {
        toast.error('Failed to import data.');
      }
    } catch (err) {
      toast.error('Error during upload.');
    }
  };

  if (loading) return <Loding />;

  return (
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

              {/* Upload, Import, Export, Search */}
              <div className="col-12 grid-margin stretch-card">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="row forms-sample">
                      <div className="col-md-4">
                        <label>File upload</label>
                        <input
                          type="file"
                          className="form-control"
                          accept=".xlsx, .xls"
                          onChange={handleFileUpload}
                        />
                        <div className="form-check mt-2">
                          <label>Delete Old Records First?</label>
                          <input
                            type="checkbox"
                            className="form-check-input ml-2"
                            onChange={(e) =>
                              setAction(e.target.checked ? 'delete_and_import' : 'insert_only')
                            }
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-3">
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                          <div>
                            <button
                              className="btn btn-primary mr-2 mb-2"
                              onClick={handleSubmit}
                            >
                              Import
                            </button>
                            <button
                              className="btn btn-success mr-2 mb-2"
                              onClick={exportToExcel}
                            >
                              Export to Excel
                            </button>
                            <button
                              className="btn btn-secondary text-white mr-2 mb-2"
                              onClick={handlePrint}
                            >
                              Print
                            </button>
                          </div>

                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control w-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <p className="card-title">Student List</p>
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
                          {currentRows.map((val, index) => (
                            <tr key={index}>
                              <td>{indexOfFirstRow + index + 1}</td>
                              <td>{val?.student_family_mobile_number}</td>
                              <td>{val?.sch_short_nm}</td>
                              <td>{val?.student_name}</td>
                              <td>{val?.student_dob}</td>
                              <td>{val?.student_email}</td>
                              <td>{val?.noticeMsg}</td>
                              <td>{val?.remark}</td>
                              <td>{val?.student_number}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <nav>
                      <ul className="pagination justify-content-end mb-0 mt-3 flex-wrap">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(
                            (p) =>
                              p === 1 ||
                              p === totalPages ||
                              (p >= currentPage - 2 && p <= currentPage + 2)
                          )
                          .map((p, i, arr) => {
                            const prev = arr[i - 1];
                            const showDots = prev && p - prev > 1;
                            return (
                              <React.Fragment key={p}>
                                {showDots && (
                                  <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                  </li>
                                )}
                                <li className={`page-item ${currentPage === p ? 'active' : ''}`}>
                                  <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(p)}
                                  >
                                    {p}
                                  </button>
                                </li>
                              </React.Fragment>
                            );
                          })}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ImportScholar;
