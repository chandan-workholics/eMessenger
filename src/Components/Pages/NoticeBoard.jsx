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

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

    const [loading, setLoading] = useState(false);
    const [noticeBoardlList, setNoticeBoardList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const rowsPerPage = 10;

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

    const columns = [
        { label: 'S.No.', key: 'sn' },
        { label: 'Title', key: 'title' },
        { label: 'Document Type', key: 'documentType' },
        { label: 'Document Link', key: 'documentLink' },
        { label: 'Thumbnails', key: 'thumbnails' },
        // { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' }
    ];

    const data = noticeBoardlList ? noticeBoardlList?.map((val) => ({
        sn: val?.id,
        title: val?.title,
        documentType: val?.document_type,
        documentLink: val?.document_link,
        thumbnails: val?.thumbnails,
        // isActive: true,
        action: (
            <div>
                <button onClick={() => handleUpdateNotice(val)} type="button" class="btn" data-toggle="modal" data-target="#exampleModalCenter">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
            </div>
        ),
    })) : [];

    const handleUpdateNotice = (val) => setUpdateNotice(val);

    

    const fetchUpdateData = (id, notice) => {
        return callAPI.put(`/notice/updateDocument/${id}`, notice);
    };

    useEffect(() => {
        updateNotice && setDatas({
            title: updateNotice.title || "",
            document_type: updateNotice.document_type || "",
            document_link: updateNotice.document_link || "",
            thumbnails: updateNotice.thumbnails || ""
        })
    }, [updateNotice])

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

            {/* Modal - Start */}
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header p-3">
                            <h3 class="modal-title text-primary font-weight-bolder" id="exampleModalLongTitle">Update Notice Board</h3>
                            {/* <button type="button" class="close fs-3" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div class="modal-body py-3">
                            <form className="forms-sample" updateNotice={updateNotice} setUpdateNotice={setUpdateNotice} onSubmit={handleSubmit}>
                                <h4 className="card-description text-primary font-weight-bolder">Primary Info</h4>
                                <div className="row">
                                    <div className="col-md-12 form-group">
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
                                    <div className="col-md-12 form-group">
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
                                    <div className="col-md-12 form-group">
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
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="thumbnail">Thumbnails <span className="text-danger">*</span></label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="thumbnail"
                                            name="thumbnail"

                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal - End */}

        </>
    )
}

export default NoticeBoard