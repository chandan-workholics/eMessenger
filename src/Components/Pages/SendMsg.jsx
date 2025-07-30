import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import callAPI from '../../commonMethod/api.js';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SendMsg = () => {
    const location = useLocation();
    const { id, school_id, subject } = location.state;
    const admin_id = sessionStorage.getItem('admin_id');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [fullStudentList, setFullStudentList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchListData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./scholar/getlist_main_student_detail_two?sch_short_nm=${school_id?.map((val) => val?.sch_short_nm)}`);
            const data = response.data.data || [];
            setStudentList(data);
            setFullStudentList(data);
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
            const response = await callAPI.get(`./msg/SentMsgToScholarData?new_msg_id=${id}&admin_id=${admin_id}&subject=${subject}&selected_ids=${idsString}`);

            if (response.status === 201 || response.status === 200) {
                toast.success("Message Sent Successfully");
                navigate(-1);
            } else {
                setError(response.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error sending message:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Updated filtering logic with school name and remark
    const filteredStudents = fullStudentList.filter((student) =>
        student.student_name.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by student name
        student.student_number.toString().includes(searchQuery) || // Filter by student number
        student.student_family_mobile_number.includes(searchQuery) || // Filter by family mobile number
        student.sch_short_nm.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by school name
        student.remark.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by remark
    );

    if (loading) {
        return <Loding />;
    }

    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
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
                                        <div className="row">
                                            <div className="col-12 col-lg-3 col-md-6 ml-auto">
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="form-control mb-3"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <div className="table-responsive">
                                                    <table className="table expandable-table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-center">Select</th>
                                                                <th>Mobile No.</th>
                                                                <th>School</th>
                                                                <th>Student Name</th>
                                                                <th>Student Id</th>
                                                                <th>Notice Message</th>
                                                                <th>Remark</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredStudents.map((val, index) => (
                                                                <tr key={val.id}>
                                                                    <td className="bg-white">
                                                                        <div className="d-flex justify-content-center align-items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-check-input position-relative"
                                                                                style={{ width: '18px', height: '18px' }}
                                                                                checked={selectedIds.includes(val.student_number)}
                                                                                onChange={() => handleCheckboxChange(val.student_number)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>{val.student_family_mobile_number}</td>
                                                                    <td>{val.sch_short_nm}</td>
                                                                    <td>{val.student_name}</td>
                                                                    <td>{val.student_number}</td>
                                                                    <td>{val.noticeMsg}</td>
                                                                    <td>{val.remark}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block d-md-flex justify-content-center align-items-center mt-3">
                                            <button className="btn btn-info mr-2 mb-3" onClick={handleSelectAll}>
                                                Select All
                                            </button>
                                            <button className="btn btn-outline-info mr-2 mb-3" onClick={handleDeselectAll}>
                                                Deselect All
                                            </button>
                                            <button className="btn btn-light mr-2 mb-3">Cancel</button>
                                            <button className="btn btn-success mb-3" onClick={handleSubmit}>
                                                Send Message
                                            </button>
                                        </div>
                                        {error && <div className="alert alert-danger">{error}</div>}
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

export default SendMsg;
