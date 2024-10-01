import React from 'react';
import Navbar from '../Template/Navbar';
import SidebarSettingPannel from '../Template/SidebarSettingPannel';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';

const ReplyReceived = () => {


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
        { label: 'Received Data', key: 'receivedData' },
    ];

    // Table data
    const data = [
        {
            reqId: 101,
            msgId: 111,
            received: '21-Aug-2024 04:20PM',
            subject: 'Student detail form',
            mobileNo: '1234567890',
            school: 'SOAG',
            studentId: 61400178,
            sent: '21-Aug-2024 04:18PM',
            receivedData: 'Data',
        },
        {
            reqId: 110,
            msgId: 121,
            received: '21-Aug-2024 04:18PM',
            subject: 'Stream & Subject Selection Form for Class XI',
            mobileNo: '0987654321',
            school: 'APSNR',
            studentId: 61400125,
            sent: '21-Aug-2024 04:18PM',
            receivedData: 'Data',
        },
        // Add more rows as needed for pagination...
    ];

    return (
        <div className="container-scroller">
            {/*----- Navbar -----*/}
            <Navbar />

            <div className="container-fluid page-body-wrapper">
                <SidebarSettingPannel />

                {/* SideBar */}
                <Sidebar />

                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                <div className="d-flex align-items-center mb-3">
                                    <h3 className="font-weight-bold mr-2">Reply Received</h3>
                                </div>
                            </div>
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <p className="card-title">Reply Received List</p>
                                        <div className="row">
                                            <div className="col-12">
                                                <form className="forms-sample">
                                                    <div className="row">
                                                        <div className="col-md-3 form-group">
                                                            <select className="form-control" id="userType">
                                                                <option>All</option>
                                                                <option>APS</option>
                                                                <option>e-Messenger</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div>
                                                                <button type="submit" className="btn btn-primary mr-2">
                                                                    Filter
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <input
                                                                type="search"
                                                                className="form-control ds-input"
                                                                id="search-input"
                                                                placeholder="Search..."
                                                                aria-label="Search for..."
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                role="combobox"
                                                                aria-controls="dropdown-listbox"
                                                                aria-expanded="false"
                                                                dir="auto"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
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
    );
};

export default ReplyReceived;
