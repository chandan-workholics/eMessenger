import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import SortableTable from '../Template/SortableTable';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';


const NoticeBoard = () => {
    const [datas, setDatas] = useState({ title: '', document_type: '', document_link: '', thumbnails: '' })
    const [updateNotice, setUpdateNotice] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [noticeBoardlList, setNoticeBoardList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const rowsPerPage = 10;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({ title: '', document_type: '', document_link: '', thumbnails: '' });
    };

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

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
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./notice/getAllNoticeBoardDetail?page=1&limit=50`);
            setNoticeBoardList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
        } catch (error) {
            console.error('Error fetching notice data:', error.message);
        } finally {
            setLoading(false);
        }
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
        { label: 'Document Type', key: 'documentType' },
        { label: 'Document Link', key: 'documentLink' },
        { label: 'Thumbnails', key: 'thumbnails' },
        { label: 'Action', key: 'action' }
    ];

    const data = noticeBoardlList ? noticeBoardlList?.map((val) => ({
        sn: val?.id,
        title: val?.title,
        documentType: val?.document_type,
        documentLink: val?.document_link,
        thumbnails: (<img src={val?.thumbnails} className='' alt='' style={{ width: '130px', height: '80px', objectFit:'contain' }} />),
        action: (
            <div>
                <button onClick={() => handleUpdateNotice(val)} type="button" className="btn">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
            </div>
        ),
    })) : [];

    const handleUpdateNotice = (val) => {
        setUpdateNotice(val);
        openModal();
        setDatas({
            title: val.title,
            document_type: val.document_type,
            document_link: val.document_link,
            thumbnails: val.thumbnails
        });
    };

    if (loading) {
        return <Loding />;
    }

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
                                        <h3 className="font-weight-bold mr-2">Notice Board</h3>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
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
                                                            <h4 className="card-title mb-0 mr-2">Create Notice</h4>
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
                                                                        value={datas.title}
                                                                        onChange={handleChange}
                                                                        placeholder="Title"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="document_type">Document Type <span className="text-danger">*</span></label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="document_type"
                                                                        name="document_type"
                                                                        onChange={handleChange}
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
                                                                    <label htmlFor="document_link">Document Link <span className="text-danger">*</span></label>
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
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="thumbnail">Thumbnails <span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        id="thumbnail"
                                                                        name="thumbnail"
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
                                    <div className="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
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

            {/* Modal Start */}
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
                                                <option value="jpg">jpg</option>
                                                <option value="doc">Doc</option>
                                                <option value="png">png</option>
                                                <option value="pdf">pdf</option>
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