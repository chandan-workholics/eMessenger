import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'

const GroupMaster = () => {
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
                                        <h3 className="font-weight-bold mr-2">Group Master</h3>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-md-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-2">
                                                            <h4 className="card-title mb-0 mr-2">Message Group Entry Form</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="exampleInputName1">Group Name<span className="text-danger">*</span></label>
                                                                            <input type="text" className="form-control" id="exampleInputName1" placeholder="Full Name" />
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <label for="userType">Status</label><br />
                                                                            <div className="btn-group btn-group-toggle mt-1" data-toggle="buttons">
                                                                                <label className="btn btn-light active py-2">
                                                                                    <input type="radio" name="options" id="option1" autocomplete="off" checked /> Active
                                                                                </label>
                                                                                <label className="btn btn-light py-2">
                                                                                    <input type="radio" name="options" id="option2" autocomplete="off" /> Inactive
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                                    <button className="btn btn-light">Cancel</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <p className="card-title">Message Group List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div className="col-md-3 form-group">
                                                                            <input type="search" className="form-control" id="exampleInputName1" placeholder="Full Name" />
                                                                        </div>
                                                                        <div className="col-md-3 form-group">
                                                                            <button type="submit" className="btn btn-primary mr-2">search</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <div id="example_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12"><table id="example" className="display expandable-table dataTable no-footer" style={{ width: "100%" }} role="grid">
                                                                        <thead>
                                                                            <tr role="row">
                                                                                <th className="select-checkbox sorting_disabled" rowspan="1" colspan="1" aria-label="Quote#" style={{ width: "153px" }}>Quote#</th>
                                                                                <th className="sorting_asc" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Product: activate to sort column descending" aria-sort="ascending" style={{ width: '177px' }}>Product</th>
                                                                                <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Business type: activate to sort column ascending" style={{ width: "210px" }}>Business type</th>
                                                                                <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Policy holder: activate to sort column ascending" style={{ width: "200px" }}>Policy holder</th>
                                                                                <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Premium: activate to sort column ascending" style={{ width: "149px" }}>Premium</th>
                                                                                <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style={{ width: "149px" }}>Status</th>
                                                                                <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Updated at: activate to sort column ascending" style={{ width: "177px" }}>Updated at</th>
                                                                                <th className="details-control sorting_disabled" rowspan="1" colspan="1" aria-label="" style={{ width: "61px" }}></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr className="odd">
                                                                                <td className=" select-checkbox">Incs234</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 1</td><td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>In progress</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="even">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>Active</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="odd">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>Expired</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="even">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>In progress</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="odd">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>Active</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="even">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>Active</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="odd">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>Active</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="even">
                                                                                <td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td>
                                                                                <td>$1200</td>
                                                                                <td>Expired</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="odd"><td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td><td>Business type 2</td><td>Jesse Thomas</td><td>$1200</td>
                                                                                <td>Active</td>
                                                                                <td>25/04/2020</td>
                                                                                <td className=" details-control"></td>
                                                                            </tr>
                                                                            <tr className="even"><td className=" select-checkbox">Incs235</td>
                                                                                <td className="sorting_1">Car insurance</td>
                                                                                <td>Business type 2</td>
                                                                                <td>Jesse Thomas</td><td>$1200</td>
                                                                                <td>In progress</td>
                                                                                <td>25/04/2020</td>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupMaster