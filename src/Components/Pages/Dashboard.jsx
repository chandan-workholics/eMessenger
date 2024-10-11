import React from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Footer from '../Template/Footer'
import Calendar from '../Template/Calendar'

const Dashboard = () => {
    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">
                    {/*----- SidebarSettingPannel -----*/}
                    {/* <SidebarSettingPannel /> */}

                    {/*----- SideBar -----*/}
                    <Sidebar />

                    <div className="main-panel dashboard-page">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin">
                                    <div className="row">
                                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                            <h3 className="font-weight-bold">Welcome Mayank</h3>
                                            <h6 className="font-weight-normal mb-0">Have a <span className="text-primary">good day!</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 grid-margin stretch-card">
                                    <div className="card counter-card">
                                        <div className="card-body">
                                            <p className="card-title mb-1">Counter Report</p>
                                            <p className="font-weight-500">About Your Data Details</p>
                                            <div className="">
                                                <img src="images/counterCard-img.svg" alt="people" />
                                            </div>
                                        </div>
                                        <div className="card bg-white">
                                            <div className="card-body pb-0">
                                                <div className="col-md-12 p-0 transparent">
                                                    <div className="row">
                                                        <div className="col-md-6 mb-4 stretch-card transparent">
                                                            <div className="card bg-fff4de">
                                                                <div className="card-body">
                                                                    <h4 className="mb-3 text-ffad44">Users (Sign Ups)</h4>
                                                                    <p className="fs-30 mb-2 text-ffad44">7252</p>
                                                                    <p>Count of all active Users/Parents</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4 stretch-card transparent">
                                                            <div className="card bg-e2fff6">
                                                                <div className="card-body">
                                                                    <h4 className="mb-3 text-25c997">Sent (This Month)</h4>
                                                                    <p className="fs-30 mb-2 text-25c997">19945</p>
                                                                    <p>Sent Msg. Count</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4 stretch-card transparent">
                                                            <div className="card bg-ffe2e5">
                                                                <div className="card-body">
                                                                    <h4 className="mb-3 text-f64e60">Reply (This Month)</h4>
                                                                    <p className="fs-30 mb-2 text-f64e60">0</p>
                                                                    <p>Sent Msg. Reply Count</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-4 stretch-card transparent">
                                                            <div className="card bg-e1f0ff">
                                                                <div className="card-body">
                                                                    <h4 className="mb-3 text-3699ff">Mobile Nos.(All)</h4>
                                                                    <p className="fs-30 mb-2 text-3699ff">26351</p>
                                                                    <p>Scholar Data Table Rows Count</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                                <div className="col-md-4 grid-margin stretch-card">
                                    <Calendar />
                                </div>

                                <div className="col-md-3 stretch-card grid-margin">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <p className="card-title">Recent Inbox</p>
                                                <h6 className="text-primary mt-1">Display only</h6>
                                            </div>
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
                            <div className="row">
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <p className="card-title">Active Messages</p>
                                                <h6 className="text-primary mt-1">Display only</h6>
                                            </div>
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
                                            <div className="d-flex justify-content-between">
                                                <p className="card-title">Active Messages</p>
                                                <h6 className="text-primary mt-1">Reply Type</h6>
                                            </div>
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
                                            <div className="d-flex justify-content-between">
                                                <p className="card-title">Recent Reply</p>
                                                <h6 className="text-primary mt-1">Received</h6>
                                            </div>
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
                          
                        </div>
                        

                        
                        <Footer />
                    </div>
                  
                </div>
               
            </div>
           
        </>
    )
}

export default Dashboard