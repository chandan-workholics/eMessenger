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
    const data = messageList
        ? messageList.map((val, index) => ({
            reqId: index + 1,
            msgId: val?.msg_id,
            received: val?.reply_date_time
                ? new Date(val.reply_date_time).toLocaleDateString('en-GB')
                : '', // Format date
            subject: val?.message?.subject_text || '',
            mobileNo: val?.mobile_no,
            school: val?.schools?.[0]?.sch_short_nm || '',
            studentId: val?.student_number,
            sent: val?.sendedMessage?.sended_date
                ? new Date(val.sendedMessage.sended_date).toLocaleDateString('en-GB')
                : '', // Format date
            replyMsgId: val?.replied_msg_id || '',
            msgBodyId: val?.replyBodies?.map((body) => body?.replied_msg_d_id || '').join(', '),
            msgType: val?.replyBodies?.map((body) => body?.msg_type || '').join(', '),
            dataReplyText: val?.replyBodies
                ?.map((reply) => {
                    try {
                        const rawText = reply?.data_reply_text || '';
                        // Remove control characters
                        const sanitizedText = rawText.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
                        const parsedData = sanitizedText ? JSON.parse(sanitizedText) : {};
                        if (parsedData?.text) {
                            return parsedData.text;
                        } else if (parsedData?.imageURIsave) {
                            return parsedData.imageURIsave;
                        } else if (parsedData?.selected) {
                            return Object.values(parsedData.selected).join(', ');
                        }
                        return '';
                    } catch (error) {
                        console.error('Error parsing JSON:', reply?.data_reply_text, error);
                        return ''; // Fallback value
                    }
                })
                .join(', '),
        }))
        : [];


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
