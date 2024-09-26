import React from 'react'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'

const ImportScholar = () => {
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
                                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Scholar Import</h3>
                                        <h6 className="text-primary font-weight-bold">NEW</h6>
                                    </div>
                                </div>
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <form className="row forms-sample">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>File upload</label>
                                                        <input type="file" name="img[]" className="file-upload-default" />
                                                        <div className="input-group col-xs-12">
                                                            <input type="file" className="form-control file-upload-info" disabled="" placeholder="Upload Image" />
                                                            <span className="input-group-append">
                                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="form-check form-check-flat form-check-primary mb-4">
                                                        <label className="form-check-label">
                                                            Is Column Title in First Row ?
                                                            <input type="checkbox" className="form-check-input" />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-flat form-check-primary mb-4">
                                                        <label className="form-check-label">
                                                            Is Delete All Old Record Fist ?
                                                            <input type="checkbox" className="form-check-input" />
                                                            <i className="input-helper"></i>
                                                        </label>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary mr-2">Import</button>
                                                    <button type="submit" className="btn btn-success mr-2">Export to Excel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <p className="card-title">Advanced Table</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <table id="example" className="display expandable-table table-hover" style={{ width: '100%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th>Mobile Number</th>
                                                                    <th>School Short Name</th>
                                                                    <th>Student Name</th>
                                                                    <th>Student Id</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>1234567890</td>
                                                                    <td>AO</td>
                                                                    <td className='text-capitalize'>test test</td>
                                                                    <td>12345678</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>1234567890</td>
                                                                    <td>AO</td>
                                                                    <td className='text-capitalize'>test test</td>
                                                                    <td>12345678</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>3</td>
                                                                    <td>1234567890</td>
                                                                    <td>AO</td>
                                                                    <td className='text-capitalize'>test test</td>
                                                                    <td>12345678</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>1234567890</td>
                                                                    <td>AO</td>
                                                                    <td className='text-capitalize'>test test</td>
                                                                    <td>12345678</td>
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
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

export default ImportScholar