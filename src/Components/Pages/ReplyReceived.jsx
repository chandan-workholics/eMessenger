import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import ExpandRowTable from '../Template/ExpandRowTable';
import callAPI from '../../commonMethod/api.js';


const ReplyReceived = () => {

    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/msg/getAllReplyMessages?page=${currentPage}&limit=${rowsPerPage}`);
            setMessageList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
        } catch (error) {
            console.error('Error fetching school data:', error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, rowsPerPage]);

    // Table columns
    const columns = [
        { label: 'Req ID', key: 'reqId' },
        { label: 'Msg ID', key: 'msgId' },
        { label: 'Received', key: 'received' },
        { label: 'Subject', key: 'subject' },
        { label: 'Mobile no.', key: 'mobileNo' },
        { label: 'School', key: 'school' },
        { label: 'Student Id', key: 'studentId' },
        { label: 'Sent', key: 'sent' },
    ];

    const rows = [
        { label: 'Req ID', key: 'reqId' },
        { label: 'Msg ID', key: 'msgId' },
        { label: 'Received', key: 'received' },
        { label: 'Subject', key: 'subject' },
        { label: 'Mobile no.', key: 'mobileNo' },
        { label: 'School', key: 'school' },
        { label: 'Student Id', key: 'studentId' },
        { label: 'Sent', key: 'sent' },
    ];

    // Table data
    const data = messageList ? messageList.map((val, index) => ({
        reqId: index + 1,
        msgId: val?.msg_id,
        received: val?.reply_date_time ? new Date(val?.reply_date_time).toLocaleDateString('en-GB') : '', // Format date
        subject: val?.message?.subject_text || '',
        mobileNo: val?.mobile_no,
        school: val?.schools[0]?.sch_short_nm,
        studentId: val?.student_main_id,
        sent: val?.sendedMessage?.sended_date ? new Date(val?.sendedMessage?.sended_date).toLocaleDateString('en-GB') : '', // Format date
        replyMsgId: val?.replyBodies?.replied_msg_id,
        msgBodyId: val?.replyBodies?.msg_body_id,
        msgType: val?.replyBodies?.msg_type,
        dataReplyText: val?.replyBodies?.data_reply_text,
        addedBy: val?.entry_by,
        addedOn: val?.entry_date ? new Date(val?.entry_date).toLocaleDateString('en-GB') : '', // Format date
        editBy: val.entry_by,
        editOn: val?.edit_date ? new Date(val?.edit_date).toLocaleDateString('en-GB') : '', // Format date
    })) : [];

    if (loading) {
        return <Loding />;
    }

    console.log(setCurrentPage)
    console.log(totalPages)

    return (
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
                                    <h3 className="font-weight-bold mr-2">Inbox</h3>
                                </div>
                            </div>
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <p className="card-title">Reply Received List</p>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="table-responsive">
                                                    <ExpandRowTable columns={columns} rows={rows} data={data} />
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
    );
};

export default ReplyReceived;
