import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import ExpandRowTable from '../Template/ExpandRowTable';
import callAPI from '../../commonMethod/api.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const SchoolMaster = () => {
    const URL = process.env.REACT_APP_URL;
    const [datas, setDatas] = useState({
        sch_nm: '',
        sch_short_nm: '',
        is_active: '1',
        address: '',
        contact_no: '',
        website: '',
        email_id: '',
        scroll_news_text: '',
        def_msg_ids: '',
        text_color: '',
        bg_color: '',
        logo_img: '',
    })
    const [updateSchool, setUpdateSchool] = useState({});
    const [schoolList, setSchoolList] = useState([]);
    const [deleteid, Setdeleteid] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({
            sch_nm: '',
            sch_short_nm: '',
            is_active: '1',
            address: '',
            contact_no: '',
            website: '',
            email_id: '',
            scroll_news_text: '',
            def_msg_ids: '',
            text_color: '',
            bg_color: '',
            logo_img: '',
        });
    };

    const handleImageChange = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        var requestOptions = { headers: { "Content-Type": "multipart/form-data", }, };
        try {
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
                    logo_img: response?.data?.url,
                });
            } else {

                toast.error("Fail To Load");
            }
        } catch (error) {
        }
    };
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await callAPI.post(`./school/createSchool`, datas);
            if (response.status >= 200 && response.status < 300) {
                fetchData();
                toast.success('School added successfully');
            } else {
                toast.error('Failed to add School');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };



    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/school/getSchool?page=${currentPage}&limit=${rowsPerPage}`);
            setSchoolList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
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
            return [];
        } finally {
            setLoading(false);
        }
    };
    const handleExport = async () => {
        const allData = await fetchAllData();
        const formattedData = schoolList.map((school) => ({
            schoolId: school?.sch_id,
            schoolFullName: school?.sch_nm,
            shortNames: school.scroll_news_text,
            shortName: school?.sch_short_nm,
            isActive: school?.is_active === 1 ? true : false,
            fontColor: school?.text_color,
            backgroundColor: school?.bg_color,
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);
        const csvContent = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'School_Master.csv');
    };

    const handlePrint = async () => {
        const allData = await fetchAllData();
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print School List</title></head><body>');
        printWindow.document.write('<h1>School List</h1>');
        printWindow.document.write('<table border="1" style="width:100%; text-align:left; border-collapse: collapse;">');
        printWindow.document.write('<tr><th>School ID</th><th>Full Name</th><th>App Scroll News</th><th>Short Name</th><th>Is Active</th><th>Font Color</th><th>Background Color</th></tr>');

        allData.forEach((val, index) => {
            const schoolId = val?.sch_id || '';
            const schoolFullName = val?.sch_nm || '';
            const shortNames = val?.scroll_news_text || '';
            const shortName = val?.sch_short_nm || '';
            const isActive = val?.is_active === 1 ? 'Active' : 'Inactive';
            const fontColor = val?.text_color || '';
            const backgroundColor = val?.bg_color || '';

            printWindow.document.write(`
                <tr>
                    <td>${schoolId}</td>
                    <td>${schoolFullName}</td>
                    <td>${shortNames}</td>
                    <td>${shortName}</td>
                    <td>${isActive}</td>
                    <td style="color: ${fontColor};">${fontColor}</td>
                    <td style="background-color: ${backgroundColor};">${backgroundColor}</td>
                </tr>
            `);
        });

        printWindow.document.write('</table></body></html>');
        printWindow.document.close();
        printWindow.print();
    };


    useEffect(() => {
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, rowsPerPage]);

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
        { label: 'School ID', key: 'schoolId' },
        { label: 'School Full Name', key: 'schoolFullName' },
        { label: 'App Scroll News', key: 'shortNames' },
        { label: 'Short Name', key: 'shortName' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Font Color', key: 'fontColor' },
        { label: 'Background Color', key: 'backgroundColor' },
        { label: 'Action', key: 'action' },
    ];

    const rows = [
        { label: 'App Scroll News', key: 'appScrollNews' },
        { label: 'Added By', key: 'addedBy' },
        { label: 'Added On', key: 'addedOn' },
        { label: 'Edit By', key: 'editBy' },
        { label: 'Edit On', key: 'editOn' },
        { label: 'School ID', key: 'schoolId' },
        { label: 'School Full Name', key: 'schoolFullName' },
        { label: 'App Scroll News', key: 'shortNames' },
        { label: 'Short Name', key: 'shortName' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Font Color', key: 'fontColor' },
        { label: 'Background Color', key: 'backgroundColor' },
        { label: 'Action', key: 'action' },
    ]


    const data = schoolList ? schoolList.map((school) => ({
        schoolId: school?.sch_id,
        schoolFullName: school?.sch_nm,
        shortName: school?.sch_short_nm,
        shortNames: school.scroll_news_text,
        isActive: school?.is_active === 1 ? true : false,
        fontColor: school?.text_color,
        backgroundColor: school?.bg_color,
        action: (
            <div>
                <button onClick={() => handleupdateSchool(school)} type="button" className="btn p-2">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
                <button onClick={() => handleDelete(school?.sch_id)} type="button" className="btn p-2">
                    <i className="fa-solid fa-trash-can text-danger"></i>
                </button>
            </div>
        ),
        appScrollNews: school.scroll_news_text,
        addedBy: school.entry_by,
        addedOn: school.entry_date,
        editBy: school.entry_by,
        editOn: school.edit_date,
        schoolLogo: <img src={school.logo_img} className='' alt='' style={{ width: '130px', height: '80px', objectFit: 'contain' }} />,
    })) : [];

    const handleupdateSchool = (school) => {
        setUpdateSchool(school);
        openModal();
        setDatas({
            sch_id: school.sch_id,
            sch_nm: school.sch_nm,
            sch_short_nm: school.sch_short_nm,
            is_active: school.is_active,
            address: school.address,
            contact_no: school.contact_no,
            website: school.website,
            email_id: school.email_id,
            scroll_news_text: school.scroll_news_text,
            text_color: school.text_color,
            bg_color: school.bg_color,
            logo_img: school.logo_img,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await callAPI.put(`./school/updateSchool/${updateSchool.sch_id}`, datas).then((response) => {
                if (response.status === 201 || response.status === 200) {
                    toast.success("School Updated Successfully");
                    closeModal();
                    fetchData();
                } else {
                    setError(response.message || 'Something went wrong');
                }
            });
        } catch (error) {
            setError('Error updating school: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Setdeleteid(id);
        setIsDeleteModalOpen(true)
    };

    function deleteItem(id) {
        callAPI.del(`./school/deleteSchool/${id}`).then(async (response) => {
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

    return (
        <>
            <div className="container-scroller">
                <Navbar />

                <div className="container-fluid page-body-wrapper">

                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-0 mb-lg-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-0 mb-lg-3">
                                        <h3 className="font-weight-bold mr-2">School</h3>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link px-3" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link px-3 active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show fade" id="add" role="tabpanel" aria-labelledby="add-tab">
                                        <div className="row">
                                            <div className="col-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-3">
                                                            <h4 className="card-title mb-0 mr-2">School Entry Form</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <form className="forms-sample" onSubmit={handleSubmit}>
                                                            <h4 className="card-description text-primary font-weight-bolder">Primary Info</h4>
                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="exampleInputName1">School Full Name <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputName1"
                                                                        placeholder="School Full Name"
                                                                        name="sch_nm"
                                                                        value={datas.sch_nm}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="exampleInputName2">School Short Name <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputName2"
                                                                        placeholder="Short Name"
                                                                        name='sch_short_nm'
                                                                        value={datas.sch_short_nm}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="userType">Status</label><br />
                                                                    <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                        <label className={`btn btn-light py-2 ${datas.is_active === '1' ? 'active' : ''}`}>
                                                                            <input
                                                                                type="radio"
                                                                                name="is_active"
                                                                                id="option1"
                                                                                value="1"
                                                                                autoComplete="off"
                                                                                checked={datas.is_active === '1'}
                                                                                onChange={handleChange}
                                                                            /> Active
                                                                        </label>
                                                                        <label className={`btn btn-light py-2 ${datas.is_active === '0' ? 'active' : ''}`}>
                                                                            <input
                                                                                type="radio"
                                                                                name="is_active"
                                                                                id="option2"
                                                                                value="0"
                                                                                autoComplete="off"
                                                                                checked={datas.is_active === '0'}
                                                                                onChange={handleChange}
                                                                            /> Inactive
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">Other Info</h4>
                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="exampleInputName1">School Address</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputName1"
                                                                        placeholder="School Address"
                                                                        name='address'
                                                                        value={datas.address}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="exampleInputNumber">Contact Number</label>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        id="exampleInputNumber"
                                                                        placeholder="Enter Contact Number"
                                                                        name='contact_no'
                                                                        value={datas.contact_no}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="exampleInputName1">School Website</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputName1"
                                                                        placeholder="School Website"
                                                                        name='website'
                                                                        value={datas.website}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="exampleInputEmail3">School Email Id</label>
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="exampleInputEmail3"
                                                                        placeholder="School Email Id"
                                                                        name='email_id'
                                                                        value={datas.email_id}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">App Top Scrolled News</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="exampleTextarea1">Scroll News</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        id="exampleTextarea1"
                                                                        rows="4"
                                                                        placeholder="Please enter Scroll News"
                                                                        name='scroll_news_text'
                                                                        value={datas.scroll_news_text}
                                                                        onChange={handleChange}
                                                                        required
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            {/* <h4 className="card-description text-primary font-weight-bolder">App Default Welcome Message IDs [ Comma(,) seprated ]</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="exampleInputName1">Message IDs</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="exampleInputName1"
                                                                        placeholder="Please Enter Msg IDs"
                                                                        name='def_msg_ids'
                                                                        value={datas.def_msg_ids}
                                                                        onChange={handleChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <hr /> */}
                                                            <h4 className="card-description text-primary font-weight-bolder">Scholar Color</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="text_color">Text Color</label>
                                                                    <div class="input-group mb-3">
                                                                        <input
                                                                            type="text"
                                                                            class="form-control"
                                                                            placeholder="Pick text color"
                                                                            name='text_color'
                                                                            value={datas.text_color}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                        <div class="input-group-prepend">
                                                                            <span class="input-group-text p-0">
                                                                                <input
                                                                                    type="color"
                                                                                    className="h-100 p-0 border-0"
                                                                                    id="text_color"
                                                                                    placeholder=""
                                                                                    name='text_color'
                                                                                    value={datas.text_color}
                                                                                    onChange={handleChange}
                                                                                    required
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="bg_color">Background Color</label>
                                                                    <div class="input-group mb-3">
                                                                        <input
                                                                            type="text"
                                                                            class="form-control"
                                                                            placeholder="Pick Background color"
                                                                            name='bg_color'
                                                                            value={datas.bg_color}
                                                                            onChange={handleChange}
                                                                            required
                                                                        />
                                                                        <div class="input-group-prepend">
                                                                            <span class="input-group-text p-0">
                                                                                <input
                                                                                    type="color"
                                                                                    className="h-100 p-0 border-0"
                                                                                    id="bg_color"
                                                                                    placeholder=""
                                                                                    name='bg_color'
                                                                                    value={datas.bg_color}
                                                                                    onChange={handleChange}
                                                                                    required
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">School Logo</h4>
                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="schoolLogo"
                                                                        name="file"
                                                                        onChange={handleImageChange}
                                                                    />
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
                                    <div className="tab-pane active" id="list" role="tabpanel" aria-labelledby="list-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <p className="card-title mb-0">School List</p>
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
                                                                <ExpandRowTable columns={columns} rows={rows} data={data} />
                                                            </div>
                                                        </div>
                                                        <nav>
                                                            <ul className="pagination justify-content-end mb-0 mt-3">
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                                        disabled={currentPage === 1}>Previous</button>
                                                                </li>
                                                                {/* <li className="page-item">
                                                                    <button className="page-link">{currentPage} of {totalPages}</button>
                                                                </li> */}
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
                                <h4 className="modal-title font-weight-bold text-primary">Update School</h4>
                                <button type="button" className="close" onClick={closeModal}>
                                    <i class="fa-solid fa-xmark fs-3 text-primary"></i>
                                </button>
                            </div>
                            <div className="modal-body p-3">
                                <form className="forms-sample" onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="sch_nm">School Full Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sch_nm"
                                                placeholder="School Full Name"
                                                name="sch_nm"
                                                value={datas.sch_nm}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="exampleInputName2">School Short Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputName2"
                                                placeholder="Short Name"
                                                name='sch_short_nm'
                                                value={datas.sch_short_nm}
                                                onChange={handleChange}
                                                required

                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="userType">Status</label><br />
                                            <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                <label className={`btn btn-light py-2 ${datas.is_active === '1' ? 'active' : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="is_active"
                                                        id="option1"
                                                        value="1"
                                                        autoComplete="off"
                                                        checked={datas.is_active}
                                                        onChange={handleChange}
                                                    /> Active
                                                </label>
                                                <label className={`btn btn-light py-2 ${datas.is_active === '0' ? 'active' : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name="is_active"
                                                        id="option2"
                                                        value="0"
                                                        autoComplete="off"
                                                        checked={datas.is_active === '0'}
                                                        onChange={handleChange}
                                                    /> Inactive
                                                </label>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="col-12">
                                            <h4 className="card-description text-primary font-weight-bolder">Other Info</h4>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="exampleInputName1">School Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputName1"
                                                        placeholder="School Address"
                                                        name='address'
                                                        value={datas.address}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="exampleInputNumber">Contact Number</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="exampleInputNumber"
                                                        placeholder="Enter Contact Number"
                                                        name='contact_no'
                                                        value={datas.contact_no}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="exampleInputName1">School Website</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputName1"
                                                        placeholder="School Website"
                                                        name='website'
                                                        value={datas.website}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="exampleInputEmail3">School Email Id</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="exampleInputEmail3"
                                                        placeholder="School Email Id"
                                                        name='email_id'
                                                        value={datas.email_id}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="col-12">
                                            <h4 className="card-description text-primary font-weight-bolder">App Top Scrolled News</h4>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="exampleTextarea1">Scroll News</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="exampleTextarea1"
                                                        rows="4"
                                                        placeholder="Please enter Scroll News"
                                                        name='scroll_news_text'
                                                        value={datas.scroll_news_text}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        {/* <div className="col-12">
                                            <h4 className="card-description text-primary font-weight-bolder">App Default Welcome Message IDs [ Comma(,) seprated ]</h4>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="exampleInputName1">Message IDs</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleInputName1"
                                                        placeholder="Please Enter Msg IDs"
                                                        name='def_msg_ids'
                                                        value={datas.def_msg_ids}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <hr /> */}
                                        <div className="col-12">
                                            <h4 className="card-description text-primary font-weight-bolder">Scholar Color</h4>
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="text_color">Text Color</label>
                                                    <div class="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Pick text color"
                                                            name='text_color'
                                                            value={datas.text_color}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text p-0">
                                                                <input
                                                                    type="color"
                                                                    className="h-100 p-0 border-0"
                                                                    id="text_color"
                                                                    placeholder=""
                                                                    name='text_color'
                                                                    value={datas.text_color}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="bg_color">Background Color</label>
                                                    <div class="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Pick Background color"
                                                            name='bg_color'
                                                            value={datas.bg_color}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text p-0">
                                                                <input
                                                                    type="color"
                                                                    className="h-100 p-0 border-0"
                                                                    id="bg_color"
                                                                    placeholder=""
                                                                    name='bg_color'
                                                                    value={datas.bg_color}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="col-12">
                                            <h4 className="card-description text-primary font-weight-bolder">School Logo</h4>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="schoolLogo"
                                                        name="file"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
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

export default SchoolMaster