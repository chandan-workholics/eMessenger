import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';

const SendMsg = () => {

    // Table columns
    const columns = [
        { label: 'Select', key: 'checkbox' },
        { label: 'Subject Line & Schools', key: 'subjectLineSchools' },
        { label: 'Priority', key: 'priority' },
        { label: 'Show Upto Date & Time', key: 'showUpto' },
        { label: 'Last Posted Date', key: 'lastPosted' },
        { label: 'Last Posted By', key: 'lastPostedBy' },
        { label: 'No. of Recipients', key: 'recipients' },
        { label: 'Seen', key: 'seen' },
        { label: 'Respond', key: 'respond' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Action', key: 'action' },
    ];

    // Table data
    const data = [
        {
            checkbox: (
                <form>
                    <input type="checkbox" className="form-check-input" />
                </form>
            ),
            subjectLineSchools: 'Reminder - 2 for Second Term outstanding fee/charges.',
            priority: '6',
            showUpto: '2024-10-01',
            lastPosted: '2024-09-25',
            lastPostedBy: 'Admin',
            recipients: 100,
            seen: 80,
            respond: 50,
            isActive: true,
            action: (
                <div>
                    <i className="fa-solid fa-pen-to-square text-warning mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-success mr-3"></i>
                    <Link to="/chat">
                        <i className="fa-solid fa-comment-dots text-info"></i>
                    </Link>
                </div>
            ),
        },
        {
            checkbox: 2,
            subjectLineSchools: 'Reminder - 2 for Second Term outstanding fee/charges.',
            priority: '7',
            showUpto: '2024-10-02',
            lastPosted: '2024-09-26',
            lastPostedBy: 'User',
            recipients: 200,
            seen: 150,
            respond: 100,
            isActive: false,
            action: (
                <div>
                    <i className="fa-solid fa-pen-to-square text-warning mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-success mr-3"></i>
                    <Link to="/chat">
                        <i class="fa-solid fa-comment-dots text-info"></i>
                    </Link>
                </div>
            ),
        },
        // Add more rows as needed for pagination...
    ];

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
                                            <p className="card-title">Created Message List</p>
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
        </>
    )
}

export default SendMsg