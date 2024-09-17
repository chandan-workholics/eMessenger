import React from 'react'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'
import Footer from '../Template/Footer'

const Dashboard = () => {
    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">
                    {/*----- SidebarSettingPannel -----*/}
                    <SidebarSettingPannel />

                    {/*----- SideBar -----*/}
                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin">
                                    <div className="row">
                                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                            <h3 className="font-weight-bold">Welcome Mayank</h3>
                                            <h6 className="font-weight-normal mb-0">All systems are running smoothly! You have <span className="text-primary">3 unread alerts!</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* <div className="col-md-6 grid-margin stretch-card">
                                    <div className="card tale-bg">
                                        <div className="card-people mt-auto">
                                            <img src="images/dashboard/people.svg" alt="people" />
                                            <div className="weather-info">
                                                <div className="d-flex">
                                                    <div>
                                                        <h2 className="mb-0 font-weight-normal"><i className="icon-sun mr-2"></i>31<sup>C</sup></h2>
                                                    </div>
                                                    <div className="ml-2">
                                                        <h4 className="location font-weight-normal">Bangalore</h4>
                                                        <h6 className="font-weight-normal">India</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-md-12 grid-margin transparent">
                                    <div className="row">
                                        <div className="col-md-3 mb-4 stretch-card transparent">
                                            <div className="card bg-light shadow" style={{ borderTop: "4px solid #00394f" }}>
                                                <div className="card-body">
                                                    <h4 className="mb-3">Users (Sign Ups)</h4>
                                                    <p className="fs-30 mb-2">7252</p>
                                                    <p>Count of all active Users/Parents</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-4 stretch-card transparent">
                                            <div className="card bg-light shadow" style={{ borderTop: "4px solid #00394f" }}>
                                                <div className="card-body">
                                                    <h4 className="mb-3">Sent (This Month)</h4>
                                                    <p className="fs-30 mb-2">19945</p>
                                                    <p>Sent Msg. Count</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-4 stretch-card transparent">
                                            <div className="card bg-light shadow" style={{ borderTop: "4px solid #00394f" }}>
                                                <div className="card-body">
                                                    <h4 className="mb-3">Reply (This Month)</h4>
                                                    <p className="fs-30 mb-2">0</p>
                                                    <p>Sent Msg. Reply Count</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-4 stretch-card transparent">
                                            <div className="card bg-light shadow" style={{ borderTop: "4px solid #00394f" }}>
                                                <div className="card-body">
                                                    <h4 className="mb-3">Mobile Nos.(All)</h4>
                                                    <p className="fs-30 mb-2">26351</p>
                                                    <p>Scholar Data Table Rows Count</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-4 stretch-card transparent">
                                            <div className="card bg-light shadow" style={{ borderTop: "4px solid #00394f" }}>
                                                <div className="card-body">
                                                    <h4 className="mb-3">Book Orders (Success)</h4>
                                                    <p className="fs-30 mb-2">0</p>
                                                    <p>Book Order Table Rows Count</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-4 stretch-card transparent">
                                            <div className="card bg-light shadow" style={{ borderTop: "4px solid #00394f" }}>
                                                <div className="card-body">
                                                    <h4 className="mb-3">Book Consignment (All)</h4>
                                                    <p className="fs-30 mb-2">0</p>
                                                    <p>Book Consignment Table Rows Count</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Active Messages <span className="text-primary">Display only</span></p>
                                            <ul className="icon-data-list">
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face1.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Isabella Becker</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>9:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face2.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Adam Warren</p>
                                                            <p className="mb-0">You have done a great job #TW111</p>
                                                            <small>10:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face3.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Leonard Thornton</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>11:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face4.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">George Morrison</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>8:50 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face5.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Ryan Cortez</p>
                                                            <p className="mb-0">Herbs are fun and easy to grow.</p>
                                                            <small>9:00 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Active Messages <span className="text-primary">Reply Type</span></p>
                                            <ul className="icon-data-list">
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face1.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Isabella Becker</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>9:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face2.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Adam Warren</p>
                                                            <p className="mb-0">You have done a great job #TW111</p>
                                                            <small>10:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face3.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Leonard Thornton</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>11:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face4.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">George Morrison</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>8:50 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face5.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Ryan Cortez</p>
                                                            <p className="mb-0">Herbs are fun and easy to grow.</p>
                                                            <small>9:00 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Recent Reply <span className='text-primary'>Received</span></p>
                                            <ul className="icon-data-list">
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face1.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Isabella Becker</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>9:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face2.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Adam Warren</p>
                                                            <p className="mb-0">You have done a great job #TW111</p>
                                                            <small>10:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face3.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Leonard Thornton</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>11:30 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face4.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">George Morrison</p>
                                                            <p className="mb-0">Sales dashboard have been created</p>
                                                            <small>8:50 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex">
                                                        <img src="images/faces/face5.jpg" alt="user" />
                                                        <div>
                                                            <p className="text-info mb-1">Ryan Cortez</p>
                                                            <p className="mb-0">Herbs are fun and easy to grow.</p>
                                                            <small>9:00 am</small>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Advanced Table</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <table id="example" className="display expandable-table" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Quote#</th>
                                                                    <th>Product</th>
                                                                    <th>Business type</th>
                                                                    <th>Policy holder</th>
                                                                    <th>Premium</th>
                                                                    <th>Status</th>
                                                                    <th>Updated at</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div> */}
                        </div>
                        {/*content-wrapper ends */}

                        {/*----- Footer -----*/}
                        <Footer />
                    </div>
                    {/*main-panel ends */}
                </div>
                {/*page-body-wrapper ends */}
            </div>
            {/* container-scroller */}
        </>
    )
}

export default Dashboard