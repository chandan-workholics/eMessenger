import React from 'react';
import Navbar from '../Template/Navbar';
import SidebarSettingPannel from '../Template/SidebarSettingPannel';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';

const MessageDraft = () => {
    // Table columns
    const columns = [
        { label: 'Msg ID', key: 'msgId' },
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
            msgId: 1,
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
                    <i className="fa-solid fa-pen-to-square mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-info mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-success"></i>
                </div>
            ),
        },
        {
            msgId: 2,
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
                    <i className="fa-solid fa-pen-to-square mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-info mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-success"></i>
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
                    <SidebarSettingPannel />

                    {/* SideBar */}
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Message Draft</h3>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-md-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">
                                                        Add
                                                    </a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">
                                                        List
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
                                        {/* Form for adding messages */}
                                        <div className="row">
                                            <div className="col-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <h4 className="card-title mb-0 mr-2">Message Entry</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <h5 className="card-description text-primary font-weight-bolder">General Info</h5>
                                                        <form className="forms-sample">
                                                            <div className="row">
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="subjectLine">Subject Line<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="priority">
                                                                        {[...Array(10).keys()].map((val) => (
                                                                            <option key={val + 1}>{val + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="showUpto">Show Upto Date & Time <span className="text-danger">*</span></label>
                                                                    <input type="date" className="form-control" id="showUpto" />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="schools">Schools<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="schools" placeholder="School Names" />
                                                                </div>
                                                                {/* Other fields */}
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                            <button className="btn btn-light">Cancel</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
                                        {/* Message list */}
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <p className="card-title">Message List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <label htmlFor="groupSubgroup">Group and Subgroup<span className="text-danger">*</span></label>
                                                                            <select className="form-control" id="groupSubgroup">
                                                                                <option>All</option>
                                                                                <option>APS</option>
                                                                                <option>e-Messenger</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-6 d-flex align-items-center">
                                                                            <button type="submit" className="btn btn-primary mr-2">Filter</button>
                                                                        </div>
                                                                        <div className="col-md-3 d-flex align-items-center">
                                                                            <input
                                                                                type="search"
                                                                                className="form-control"
                                                                                id="search-input"
                                                                                placeholder="Search..."
                                                                                aria-label="Search for..."
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageDraft;
