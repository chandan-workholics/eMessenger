import React from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';

const SendMsg = () => {

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
    const data = [
        {
            checkbox: (
                <form>
                    <div className="d-flex justify-content-center align-items-center">
                        <input type="checkbox" className="form-check-input" style={{ width: '18px', height: '18px' }} />
                    </div>
                </form>
            ),
            studentDataId: '26061',
            mobileNo: '1236547890',
            schoolShortName: 'APSNR',
            scholarNo: '785423',
            sendedId: '',
            sendedDate: '',
            isSeen: 'No',
            isReplyDone: 'No',
        },
        {
            checkbox: (
                <form>
                    <div className="d-flex justify-content-center align-items-center">
                        <input type="checkbox" className="form-check-input" style={{ width: '18px', height: '18px' }} />
                    </div>
                </form>
            ),
            studentDataId: '26061',
            mobileNo: '1236547890',
            schoolShortName: 'APSNR',
            scholarNo: '785423',
            sendedId: '',
            sendedDate: '',
            isSeen: 'No',
            isReplyDone: 'No',
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
                                            <p className="card-title">Send Message To</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <SortableTable columns={columns} data={data} />
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <button className="btn btn-info mr-2">Select All</button>
                                                            <button className="btn btn-outline-info mr-2">Deselect All</button>
                                                            <button className="btn btn-light mr-2">Cancel</button>
                                                            <button type="submit" className="btn btn-success">Send Message</button>
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
    )
}

export default SendMsg