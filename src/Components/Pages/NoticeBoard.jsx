import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import SortableTable from '../Template/SortableTable';
import callAPI, { interceptor } from '../../commonMethod/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const NoticeBoard = () => {
    const [datas, setDatas] = useState({ title: '', document_type: '', document_link: '', thumbnails: '', school_id: '' })
    const [updateNotice, setUpdateNotice] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [noticeBoardlList, setNoticeBoardList] = useState([]);
    const URL = process.env.REACT_APP_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const rowsPerPage = 5;
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({ title: '', document_type: '', document_link: '', thumbnails: '', school_id: '' });
    };
    const [SchoolList, setSchoolList] = useState([]);

    let name, value;
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // If the field being changed is 'document_link', update document_type automatically
        if (name === 'document_link') {
            const document_type = getDocumentType(value);  // Automatically determine document type
            setDatas(prevState => ({
                ...prevState,
                [name]: value,
                document_type: document_type  // Update document type based on the URL
            }));
        } else {
            setDatas(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            callAPI.post(`./notice/addDocument`, datas).then(async (response) => {
                if (response.status === 201 || response.status === 200) {
                    toast.success("Notice Added Successfully");
                    setLoading(false);
                    fetchData();
                } else {
                    setLoading(false);
                    setError(response.message || 'something went wrong');
                }
            });
        } catch (error) {
            setLoading(false);
            console.error('Error adding notice:', error.message);
        }
    };
    useEffect(() => {
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
        fetchSchoolData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./notice/getAllNoticeBoardDetail`);
            setNoticeBoardList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalPages));
        } catch (error) {
            console.error('Error fetching notice data:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchAllData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./notice/getAllNoticeBoardDetail?limit=0`);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching full data:', error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWelcomeMsg = async (id) => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error("No token provided");
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(`https://apps.actindore.com/api/notice/deleteDocument/${id}`, { headers });

            if (response.status === 200 || response.status === 201) {
                toast.success("Welcome message deleted successfully.");
                fetchData();
            } else {
                toast.error(response.message || "Failed to delete the welcome message.");
            }
        } catch (error) {
            toast.error(`Error deleting the welcome message: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };



    const handleExport = async () => {
        const allData = await fetchAllData();
        const formattedData = allData.map((val, index) => ({
            sn: val?.id,
            title: val?.title,
            school_id: val?.school_id,
            documentType: val?.document_type,
            documentLink: (<Link to={val?.document_link} className='text-info' target='_blank'>{val?.document_link}</Link>),
            thumbnails: (val?.document_type !== 'pdf' ? <img src={val?.thumbnails} className='' alt='' style={{ width: '130px', height: '80px', objectFit: 'contain' }} /> : <img src='https://apps.actindore.com/Uploads/image/1729838073596-1729838073596.png' className='' alt='' style={{ width: '130px', height: '80px', objectFit: 'contain' }} />),
        }));
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const csvContent = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'notice_board.csv');
    };

    const handlePrint = async () => {
        const allData = await fetchAllData();

        if (!allData || allData.length === 0) {
            alert("No data available to print.");
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Notice Board</title></head><body>');
        printWindow.document.write('<h1>Notice Board List</h1>');
        printWindow.document.write('<table border="1" style="width:100%; text-align:left;">');
        printWindow.document.write('<tr><th>S.No</th><th>Title</th><th>School</th><th>Document Type</th><th>Document Link</th><th>Thumbnails</th></tr>');
        allData.forEach((val, index) => {
            const documentLink = val?.document_link ? `<a href="${val?.document_link}" class="text-info" target="_blank">${val?.document_link}</a>` : '#';
            const documentType = val?.document_type || '#';
            const thumbnail = val?.document_type !== 'pdf'
                ? `<img src="${val?.thumbnails}" alt="" style="width:130px; height:80px; object-fit:contain;" />`
                : `<img src="https://apps.actindore.com/Uploads/image/1729838073596-1729838073596.png" alt="" style="width:130px; height:80px; object-fit:contain;" />`;

            printWindow.document.write(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${val?.title || ''}</td>
                    <td>${val?.school_id || ''}</td>
                    <td>${documentType}</td>
                    <td>${documentLink}</td>
                    <td>${thumbnail}</td>
                </tr>
            `);
        });
        printWindow.document.write('</table></body></html>');
        printWindow.document.close();
        printWindow.print();
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await callAPI.put(`./notice/updateDocument/${updateNotice.id}`, datas).then((response) => {
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
    const columns = [
        { label: 'S.No.', key: 'sn' },
        { label: 'Title', key: 'title' },
        { label: 'School', key: 'school_id' },
        { label: 'Document Type', key: 'documentType' },
        { label: 'Document Link', key: 'documentLink' },
        { label: 'Thumbnails', key: 'thumbnails' },
        { label: 'Action', key: 'action' }
    ];
    const data = noticeBoardlList ? noticeBoardlList?.map((val) => ({
        sn: val?.id,
        title: val?.title,
        school_id: val?.school_id,
        documentType: val?.document_type,
        documentLink: (<Link to={val?.document_link} className='text-info' target='_blank'>{val?.document_link}</Link>),
        thumbnails: (val?.document_type !== 'pdf' ? <img src={val?.thumbnails} className='' alt='' style={{ width: '130px', height: '80px', objectFit: 'contain' }} /> : <img src='https://apps.actindore.com/Uploads/image/1729838073596-1729838073596.png' className='' alt='' style={{ width: '130px', height: '80px', objectFit: 'contain' }} />),
        action: (
            <div>
                <button onClick={() => handleUpdateNotice(val)} type="button" className="btn">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
                <button onClick={() => handleDeleteWelcomeMsg(val.id)} type="button" className="btn p-2">
                    <i className="fa-solid fa-trash-can text-danger"></i>
                </button>
            </div>
        ),
    })) : [];
    const handleUpdateNotice = (val) => {
        setUpdateNotice(val);
        openModal();
        setDatas({
            title: val.title,
            school_id: val.school_id,
            document_type: getDocumentType(val.document_link),
            document_link: val.document_link,
            thumbnails: val.thumbnails
        });
    };

    const getDocumentType = (url) => {
        if (url.endsWith('.pdf')) {
            return 'PDF';
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return 'YOUTUBE';
        } else if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
            return 'IMAGE';
        }
        return '';
    };
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }; if (loading) {
        return <Loding />;
    }
    const handleImageChange = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        var requestOptions = {
            headers: {
                "Content-Type": "multipart/form-data",

            },
        }; try {
            const fetchdata = axios.post(
                `${URL}/v1/admin/imageUpload_Use/imageUpload`,
                formData,
                requestOptions
            );
            const response = await fetchdata;
            if (response.status === 200) {
                toast.success("Data Uploaded Successfully");
                setDatas({
                    ...datas,
                    thumbnails: response?.data?.url,
                    document_link: response?.data?.url,
                });
            } else {

                toast.error("Fail To Load");
            }
        } catch (error) {
        }
    };
    const handlePdfChange = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        var requestOptions = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const fetchdata = axios.post(
                `${URL}/v1/admin/pdfUpload_Use/pdfUpload`,
                formData,
                requestOptions
            );
            const response = await fetchdata;
            if (response.status === 200) {
                toast.success("Data Uploaded Successfully");

                setDatas({
                    ...datas,
                    document_link: response?.data?.url,
                });
            } else {

                toast.error("Fail To Load");
            }
        } catch (error) {
        }
    };

    const fetchSchoolData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./school/getSchool?limit=0`);
            setSchoolList(response.data.data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchSchoolData(); 
    // }, []);

    console.log(totalPages)
    console.log(error)
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
                                        <h3 className="font-weight-bold mr-2">Welcome Message</h3>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link px-4" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link px-4 active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
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
                                                        <div className="d-flex align-items-center mb-3">
                                                            <h4 className="card-title mb-0 mr-2">Create Welcome Message</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <div className="forms-sample" >
                                                            <h4 className="card-description text-primary font-weight-bolder">Primary Info</h4>
                                                            <div className="row">
                                                                <div className="col-md-4 form-group"><label htmlFor="title">Title <span className="text-danger">*</span></label><input type="text" className="form-control" id="title" name="title" value={datas.title} onChange={handleChange} placeholder="Title" required />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label for="school_id">Schools</label>
                                                                    <select className="form-control" name='school_id' onChange={handleChange}>
                                                                        <option value="null">Common</option>
                                                                        {SchoolList?.map((val) => {
                                                                            return (
                                                                                <option value={val?.school_id}>{val?.sch_short_nm}</option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="document_type">Document Type <span className="text-danger">*</span></label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="document_type" name="document_type" onChange={handleChange} required>
                                                                        <option value="" disabled selected>Please Select</option>
                                                                        <option value="PDF">PDF</option>
                                                                        <option value="YOUTUBE">YOUTUBE</option>
                                                                        <option value="IMAGE">IMAGE</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="document_link">Document Link </label>
                                                                    <input type="text" className="form-control" id="document_link" name="document_link" value={datas.document_link} onChange={handleChange} placeholder="Enter Document Link"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="thumbnail">Thumbnails <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="thumbnail"
                                                                        name="file"
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </div>

                                                                {datas.document_type === "PDF" ? <div className="col-md-4 form-group">
                                                                    <label htmlFor="thumbnail">Pdf Upload Only <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="thumbnail"
                                                                        name="file"
                                                                        onChange={handlePdfChange}
                                                                    />
                                                                </div> : ''}
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mr-2" onClick={handleSubmit} disabled={loading}>
                                                                {loading ? 'Submitting...' : 'Submit'}
                                                            </button>
                                                            <button className="btn btn-light" type="reset">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <p className="card-title mb-0">Welcome Message List</p>
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
                                                                <SortableTable columns={columns} data={data} />
                                                            </div>
                                                        </div>
                                                        {/* <nav>
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
                                                        </nav> */}
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

            {/* Modal Start */}
            {isModalOpen && (
                <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex align-items-center bg-ffe2e5 py-3">
                                <h3 className="modal-title font-weight-bold text-primary">Update Welcome Message</h3>
                                <button type="button" className="close" onClick={closeModal}>
                                    <i class="fa-solid fa-xmark fs-3 text-primary"></i>
                                </button>
                            </div>
                            <div className="modal-body p-3">
                                <form className="forms-sample" onSubmit={handleUpdate}>
                                    <div className="modal-body p-0">
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="update_title"
                                                name="title"
                                                value={datas.title}
                                                onChange={handleChange}
                                                placeholder="Title"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label for="school_id">School<span className="text-danger">*</span></label>
                                            <select
                                                className="form-control"
                                                name="school_id"
                                                value={datas.school_id} // Set the selected value
                                                onChange={handleChange} // Handle changes
                                            >
                                                <option value="null">Common</option>
                                                {SchoolList?.map((val) => (
                                                    <option key={val.school_id} value={val.school_id}>
                                                        {val?.sch_short_nm}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="document_type">Document Type</label>
                                            <select
                                                className="form-control"
                                                id="document_type"
                                                name="document_type"
                                                value={datas.document_type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>Please Select</option>
                                                <option value="PDF">PDF</option>
                                                <option value="YOUTUBE">YOUTUBE</option>
                                                <option value="IMAGE">IMAGE</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="document_link">Document Link</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="document_link"
                                                name="document_link"
                                                value={datas.document_link}
                                                onChange={handleChange}
                                                placeholder="Enter Document Link"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="thumbnail">Thumbnails</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="thumbnail"
                                                name="thumbnail"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer p-0 border-0">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal End */}

        </>
    )
}

export default NoticeBoard