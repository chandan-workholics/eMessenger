import React from 'react'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'

const ReplyReceived = () => {
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
                                                                <div className="">
                                                                    <button type="submit" className="btn btn-primary mr-2">Filter</button>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." aria-label="Search for..." autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <div id="example_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12"><table id="example" className="display expandable-table dataTable no-footer" style={{ width: "100%" }} role="grid">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="select-checkbox sorting_disabled" rowspan="1" colspan="1" aria-label="Quote#" style={{ width: "153px" }}>Req. Id</th>
                                                                    <th className="sorting_asc" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Recieved Info: activate to sort column descending" aria-sort="ascending" style={{ width: '177px' }}>Recieved Info</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Msg Id: activate to sort column ascending" style={{ width: "210px" }}>Msg Id</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Subject: activate to sort column ascending" style={{ width: "200px" }}>Subject</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Mobile No.: activate to sort column ascending" style={{ width: "149px" }}>Mobile No.</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="School: activate to sort column ascending" style={{ width: "149px" }}>School</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Scholar: activate to sort column ascending" style={{ width: "177px" }}>Scholar</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Sent Info: activate to sort column ascending" style={{ width: "177px" }}>Sent Info</th>
                                                                    <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Recieved Data: activate to sort column ascending" style={{ width: "177px" }}>Recieved Data</th>
                                                                    <th className="details-control sorting_disabled" rowspan="1" colspan="1" aria-label="" style={{ width: "61px" }}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="odd">
                                                                    <td className=" select-checkbox">1234</td>
                                                                    <td className="sorting_1">30-Apr-2021 <br /> 12:12PM</td>
                                                                    <td>7856</td>
                                                                    <td></td>
                                                                    <td>1234567890</td>
                                                                    <td className='text-uppercase'>TEST</td>
                                                                    <td>11223344</td>
                                                                    <td>01-Jan-1970 <br /> 05:30AM</td>
                                                                    <td></td>
                                                                    <td className=" details-control"></td>
                                                                </tr>
                                                                <tr className="odd">
                                                                    <td className=" select-checkbox">1234</td>
                                                                    <td className="sorting_1">30-Apr-2021 <br /> 12:12PM</td>
                                                                    <td>7856</td>
                                                                    <td></td>
                                                                    <td>1234567890</td>
                                                                    <td className='text-uppercase'>TEST</td>
                                                                    <td>11223344</td>
                                                                    <td>01-Jan-1970 <br /> 05:30AM</td>
                                                                    <td></td>
                                                                    <td className=" details-control"></td>
                                                                </tr>
                                                                <tr className="odd">
                                                                    <td className=" select-checkbox">1234</td>
                                                                    <td className="sorting_1">30-Apr-2021 <br /> 12:12PM</td>
                                                                    <td>7856</td>
                                                                    <td></td>
                                                                    <td>1234567890</td>
                                                                    <td className='text-uppercase'>TEST</td>
                                                                    <td>11223344</td>
                                                                    <td>01-Jan-1970 <br /> 05:30AM</td>
                                                                    <td></td>
                                                                    <td className=" details-control"></td>
                                                                </tr>
                                                                <tr className="odd">
                                                                    <td className=" select-checkbox">1234</td>
                                                                    <td className="sorting_1">30-Apr-2021 <br /> 12:12PM</td>
                                                                    <td>7856</td>
                                                                    <td></td>
                                                                    <td>1234567890</td>
                                                                    <td className='text-uppercase'>TEST</td>
                                                                    <td>11223344</td>
                                                                    <td>01-Jan-1970 <br /> 05:30AM</td>
                                                                    <td></td>
                                                                    <td className=" details-control"></td>
                                                                </tr>
                                                                <tr className="odd">
                                                                    <td className=" select-checkbox">1234</td>
                                                                    <td className="sorting_1">30-Apr-2021 <br /> 12:12PM</td>
                                                                    <td>7856</td>
                                                                    <td></td>
                                                                    <td>1234567890</td>
                                                                    <td className='text-uppercase'>TEST</td>
                                                                    <td>11223344</td>
                                                                    <td>01-Jan-1970 <br /> 05:30AM</td>
                                                                    <td></td>
                                                                    <td className=" details-control"></td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                        </div>
                                                        </div>
                                                            <div className="row">
                                                                <div className="col-sm-12 col-md-5">

                                                                </div>
                                                                <div className="col-sm-12 col-md-7">

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
    )
}

export default ReplyReceived