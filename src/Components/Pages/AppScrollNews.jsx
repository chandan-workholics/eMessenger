import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import SortableTable from '../Template/SortableTable';
import callAPI from '../../commonMethod/api';
import { toast } from 'react-toastify';

const AppScrollNews = () => {

    const [datas, setDatas] = useState({ detail: '' });
    const [updateAppScrollNews, setUpdateAppScrollNews] = useState({});
    const [deleteid, Setdeleteid] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [appScrollNewsList, setappScrollNewsList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [length, setLength] = useState(0);
    const rowsPerPage = 10;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setDatas({ detail: '' });
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
        setLoading(true);
        setError(null);
        try {
            callAPI.post(`./appScrollerMsg/createScrollerData`, datas).then(async (response) => {
                if (response.status === 201 || response.status === 200) {
                    toast.success("App Scroll News Added Successfully");
                    setLoading(false);
                    fetchData();
                } else {
                    setLoading(false);
                    setError(response.message || 'something went wrong');
                }
            });
        } catch (error) {
            setLoading(false);
            console.error('Error adding App Scroll News:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./appScrollerMsg/getAppScrollerMsgDetail`);
            setappScrollNewsList(response.data.data || []);
            setLength(response?.data?.data?.length == null ? 0 : response?.data?.data?.length)
            setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
        } catch (error) {
            console.error('Error fetching welcome messgae data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { label: 'Id', key: 'scroller_id' },
        { label: 'Detail', key: 'detail' },
        { label: 'Action', key: 'action' }
    ];

    const data = appScrollNewsList ? appScrollNewsList?.map((val) => ({
        scroller_id: 1,
        detail: val?.detail,
        action: (
            <div>
                <button onClick={() => handleupdateAppScrollNews(val)} type="button" className="btn p-2">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </button>
                <button onClick={() => handleDelete(val?.scroller_id)} type="button" className="btn p-2">
                    <i className="fa-solid fa-trash-can text-danger"></i>
                </button>
            </div>
        ),
    })) : [];

    const handleupdateAppScrollNews = (val) => {
        setUpdateAppScrollNews(val);
        openModal();
        setDatas({
            detail: val.detail
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await callAPI.put(`./appScrollerMsg/updateScrollerData/${updateAppScrollNews.scroller_id}`, datas).then((response) => {
                if (response.status === 201 || response.status === 200) {
                    toast.success("App Scroll News Updated Successfully");
                    closeModal();
                    fetchData();
                } else {
                    setError(response.message || 'Something went wrong');
                }
            });
        } catch (error) {
            setError('Error updating app scroll news: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Setdeleteid(id);
        setIsDeleteModalOpen(true)
    };

    function deleteItem(id) {
        callAPI.del(`./appScrollerMsg/deleteScrollerData/${id}`).then(async (response) => {
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

    console.log(totalPages)
    console.log(error)
    console.log('update App News', updateAppScrollNews)

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
                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">App Scroll News Message</h3>
                                    </div>
                                </div>
                            </div>
                            {/* Form for adding messages */}
                            {length === 0 ? <div className="row">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-2">
                                                <h4 className="card-title mb-0 mr-2">News Message</h4>
                                                <p className="text-danger font-weight-bold mb-0">NEW</p>
                                            </div>
                                            <form className="forms-sample" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="detail">Create Message</label>
                                                        <textarea
                                                            className="form-control"
                                                            id="detail"
                                                            rows="5"
                                                            placeholder="Please Create Message"
                                                            name='detail'
                                                            value={datas.detail}
                                                            onChange={handleChange}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                {/* Submit and Cancel buttons */}
                                                <button type="submit" className="btn btn-primary mr-2" disabled={loading}>
                                                    {loading ? 'Submitting...' : 'Submit'}
                                                </button>
                                                <button className="btn btn-light" type="reset">Cancel</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                            {/* Message list */}
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">App Scroll News List</p>
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

            {/* Modal Start */}
            {
                isModalOpen && (
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
                                                <label htmlFor="detail">Update Message</label>
                                                <textarea
                                                    className="form-control"
                                                    id="detail"
                                                    rows="5"
                                                    placeholder="Please Create Message"
                                                    name='detail'
                                                    value={datas.detail}
                                                    onChange={handleChange}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer p-0 border-0">
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
                )
            }
            {/* Modal End */}

            {
                isDeleteModalOpen && (
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
                )
            }
        </>
    )
}

export default AppScrollNews