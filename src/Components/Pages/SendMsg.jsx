import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';
import callAPI from '../../commonMethod/api.js';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SendMsg = () => {
    const location = useLocation()
    const { id } = location.state
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedIds, setSelectedIds] = useState([]);
    const rowsPerPage = 10;

    const fetchListData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./scholar/getlist_main_student_detail?page=1&limit=200`);
            setStudentList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
        } catch (error) {
            console.error('Error fetching student data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListData();
    }, []);

    const handleSelectAll = () => {
        const allIds = studentList.map((student) => student.student_number);
        setSelectedIds(allIds);
    };

    const handleDeselectAll = () => {
        setSelectedIds([]);
    };

    const handleCheckboxChange = (scholarNo) => {
        if (selectedIds.includes(scholarNo)) {
            setSelectedIds(selectedIds.filter((id) => id !== scholarNo));
        } else {
            setSelectedIds([...selectedIds, scholarNo]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedIds.length === 0) {
            toast.error("No students selected!");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const idsString = selectedIds.join(',');
            const response = await callAPI.get(`./msg/SentMsgToScholarData?new_msg_id=${id}&admin_id=115&selected_ids=${idsString}`);

            if (response.status === 201 || response.status === 200) {
                toast.success("Message Sent Successfully");
                navigate(-1)
            } else {
                setError(response.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error sending message:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Table columns
    const columns = [
        { label: 'Select', key: 'checkbox' },
        { label: 'Student Data Id', key: 'studentDataId' },
        { label: 'Mobile No.', key: 'mobileNo' },
        { label: 'School Short Name', key: 'schoolShortName' },
        { label: 'Scholar No.', key: 'scholarNo' },
        { label: 'Sended Id', key: 'sendedId' },
        { label: 'Sended Date', key: 'sendedDate' },
        { label: 'Is Seen', key: 'isSeen' },
        { label: 'Is Reply Done', key: 'isReplyDone' },
    ];

    // Table data
    const data = studentList.map((val) => ({
        checkbox: (
            <div className="d-flex justify-content-center align-items-center">
                <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ width: '18px', height: '18px' }}
                    checked={selectedIds.includes(val.student_number)}
                    onChange={() => handleCheckboxChange(val.student_number)}
                />
            </div>
        ),
        studentDataId: val?.student_main_id,
        mobileNo: val?.student_family_mobile_number,
        schoolShortName: 'Na',
        scholarNo: val?.student_number,
        sendedId: 'Na',
        sendedDate: 'Na',
        isSeen: 'Na',
        isReplyDone: 'Na',
    }));

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
                                        <h3 className="font-weight-bold mr-2">Send Message</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Send Message To</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <SortableTable columns={columns} data={data} />
                                                        <div className="d-flex justify-content-center align-items-center mt-3">
                                                            <button
                                                                className="btn btn-info mr-2"
                                                                onClick={handleSelectAll}
                                                            >
                                                                Select All
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-info mr-2"
                                                                onClick={handleDeselectAll}
                                                            >
                                                                Deselect All
                                                            </button>
                                                            <button className="btn btn-light mr-2">Cancel</button>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-success"
                                                                onClick={handleSubmit}
                                                            >
                                                                Send Message
                                                            </button>
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
    );
};

export default SendMsg;
