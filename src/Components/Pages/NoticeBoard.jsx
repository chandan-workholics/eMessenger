import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import SortableTable from '../Template/SortableTable';

const NoticeBoard = () => {

    const [formData, setFormData] = useState({
        title: '',
        documentType: '',
        documentLink: '',
        thumbnail: null,
    });

    const token = sessionStorage.getItem('token');
    const URL = process.env.REACT_APP_URL;
    const [loading, setLoading] = useState(false);
    const [noticeBoardlList, setNoticeBoardList] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] }); // For file input
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const form = new FormData();
        form.append('title', formData.title);
        form.append('documentType', formData.documentType);
        form.append('documentLink', formData.documentLink);
        form.append('thumbnail', formData.thumbnail);

        try {
            const response = await fetch(`${URL}/notice/addDocument`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: form, // FormData contains the file and other fields
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Notice added successfully:', result);
                // You can add code to reset the form or show success message
            } else {
                console.error('Failed to add notice:', result.message);
            }
        } catch (error) {
            console.error('Error adding notice:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getNoticeBoardlList = async () => {
            try {
                const response = await fetch(`${URL}/notice/getAllNoticeBoardDetail?page=1&limit=50`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                setNoticeBoardList(result);
                setTotalPages(Math.ceil(result?.pagination?.totalPages / rowsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        getNoticeBoardlList();
    }, []);



    const columns = [
        { label: 'S.No.', key: 'sn' },
        { label: 'Title', key: 'title' },
        { label: 'Document Type', key: 'documentType' },
        { label: 'Document Link', key: 'documentLink' },
        { label: 'Thumbnails', key: 'thumbnails' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' }
    ];

    const data = noticeBoardlList ? noticeBoardlList?.data?.map((val) => ({
        sn: val?.admin_id,
        title: val?.title,
        documentType: val?.document_type,
        documentLink: val?.document_link,
        thumbnails: val?.thumbnails,
        isActive: true,
        action: (
            <div>
                <i className="fa-solid fa-pen-to-square mr-3"></i>
                {/* <i className="fa-solid fa-trash-can text-danger mr-3"></i> */}
            </div>
        ),
    })) : [];

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <Loding />;
    }

    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">

                    {/* SideBar */}
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Notice Board</h3>
                                        {/* <h6 className="text-primary font-weight-bold">NEW</h6> */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center justify-content-end mb-3">
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
                                            <div className="col-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-3">
                                                            <h4 className="card-title mb-0 mr-2">Notice Board Content</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <form className="forms-sample" onSubmit={handleSubmit}>
                                                            <h4 className="card-description text-primary font-weight-bolder">Primary Info</h4>
                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="title">Title <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="title"
                                                                        name="title"
                                                                        value={formData.title}
                                                                        onChange={handleInputChange}
                                                                        placeholder="Title"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="documentType">Document Type <span className="text-danger">*</span></label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="documentType"
                                                                        name="documentType"
                                                                        value={formData.document_type}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                    >
                                                                        <option value="" disabled>Please Select</option>
                                                                        <option value="jpg">jpg</option>
                                                                        <option value="doc">Doc</option>
                                                                        <option value="png">png</option>
                                                                        <option value="pdf">pdf</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="documentLink">Document Link <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="documentLink"
                                                                        name="documentLink"
                                                                        value={formData.document_link}
                                                                        onChange={handleInputChange}
                                                                        placeholder="Enter Document Link"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="thumbnail">Thumbnails <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="thumbnail"
                                                                        name="thumbnail"
                                                                        onChange={handleInputChange}
                                                                        required
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mr-2" disabled={loading}>
                                                                {loading ? 'Submitting...' : 'Submit'}
                                                            </button>
                                                            <button className="btn btn-light" type="reset">Cancel</button>
                                                        </form>
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
                                                        <p className="card-title">Notice List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <SortableTable columns={columns} data={data} />
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoticeBoard