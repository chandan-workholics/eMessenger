import React, { useEffect, useState } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import Loding from '../Template/Loding';
import ExpandRowTable from '../Template/ExpandRowTable';
import callAPI from '../../commonMethod/api.js';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ReplyReceived = () => {
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;
    const formatDateTimeWithAmPm = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    };


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/msg/getAllReplyMessages?page=${currentPage}&limit=${rowsPerPage}`);
            setMessageList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.total / rowsPerPage));
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get('/msg/getAllReplyMessages?limit=0'); // Fetch all data
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching full data:', error.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        const allData = await fetchAllData();
        const formattedData = allData.map((val, index) => ({
            ReqID: index + 1,
            MsgID: val?.msg_id,
            Received: formatDateTimeWithAmPm(val?.reply_date_time || ''),
            Subject: val?.message?.subject_text || '',
            MobileNo: val?.mobile_no,
            School: val?.schools?.[0]?.sch_short_nm || '',
            StudentID: val?.student_number,
            Sent: formatDateTimeWithAmPm(val?.sendedMessage?.sended_date || ''),
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);
        const csvContent = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'Reply_Received.csv');
    };

    const handlePrint = async () => {
        const allData = await fetchAllData();
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Reply Received</title></head><body>');
        printWindow.document.write('<h1>Reply Received List</h1>');
        printWindow.document.write('<table border="1" style="width:100%; text-align:left;">');
        printWindow.document.write('<tr><th>Req ID</th><th>Msg ID</th><th>Received</th><th>Subject</th><th>Mobile No.</th><th>School</th><th>Student ID</th><th>Sent</th></tr>');
        allData.forEach((val, index) => {
            printWindow.document.write(
                `<tr>
                    <td>${index + 1}</td>
                    <td>${val?.msg_id || ''}</td>
                    <td>${formatDateTimeWithAmPm(val?.reply_date_time || '')}</td>
                    <td>${val?.message?.subject_text || ''}</td>
                    <td>${val?.mobile_no || ''}</td>
                    <td>${val?.schools?.[0]?.sch_short_nm || ''}</td>
                    <td>${val?.student_number || ''}</td>
                    <td>${formatDateTimeWithAmPm(val?.sendedMessage?.sended_date || '')}</td>
                </tr>`
            );
        });
        printWindow.document.write('</table></body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    useEffect(() => {
        fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const data = messageList.map((val, index) => ({
        reqId: index + 1,
        msgId: val?.msg_id,
        received: formatDateTimeWithAmPm(val?.reply_date_time || ''),
        subject: val?.message?.subject_text || '',
        mobileNo: val?.mobile_no,
        school: val?.schools?.[0]?.sch_short_nm || '',
        studentId: val?.student_number,
        sent: formatDateTimeWithAmPm(val?.sendedMessage?.sended_date || ''),
    }));

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                                <h3 className="font-weight-bold">Inbox</h3>
                            </div>
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className="card-title mb-0">Reply Received List</p>

                                            <div className="d-flex justify-content-center mb-3">
                                                <button className=" border-0 bg-transparent px-2 mr-2" onClick={handlePrint}><i class="fa-solid fa-print text-primary"></i>
                                                    <br /><span className='' style={{ fontSize: "12px" }}>Print</span>
                                                </button>
                                                <button className=" border-0 bg-transparent px-2" onClick={handleExport}><i class="fa-solid fa-file-export text-success"></i>
                                                    <br /><span className='' style={{ fontSize: "12px" }}>Export</span>
                                                </button>
                                            </div>
                                        </div>
                                        <ExpandRowTable columns={columns} rows={rows} data={data} />

                                        <nav>
                                            <ul className="pagination justify-content-end">
                                                <li className="page-item">
                                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                                                </li>
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className="page-item">
                                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
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
    );
};

export default ReplyReceived;