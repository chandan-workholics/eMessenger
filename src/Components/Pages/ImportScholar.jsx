import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';

const ImportScholar = () => {

    const [importStudent, setImportStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://206.189.130.102:3550/api/scholar/getScholarDetail')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const result = await response.json();
                setImportStudent(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loding />;
    if (error) return <p>Error: {error}</p>;

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
                                                                {importStudent && importStudent.length > 0 ? (
                                                                    importStudent?.map((val, index) => (
                                                                        <tr key={val.id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{val.mobile_no}</td>
                                                                            <td>{val.sch_short_nm}</td>
                                                                            <td></td>
                                                                            <td>{val.scholar_no}</td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr><td colSpan="5">No data available</td></tr>
                                                                )}
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