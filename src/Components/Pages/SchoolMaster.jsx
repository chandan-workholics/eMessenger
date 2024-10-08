import React, { useEffect, useState } from 'react'
import Navbar from '../Template/Navbar'
import Sidebar from '../Template/Sidebar'
import Loding from '../Template/Loding';
import ExpandRowTable from '../Template/ExpandRowTable';
import callAPI from '../../commonMethod/api.js';

const SchoolMaster = () => {

    const [schoolList, setSchoolList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await callAPI.get(`/school/getSchool?page=${currentPage}&limit=${rowsPerPage}`);
                setSchoolList(response.data.data || []);
                setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
            } catch (error) {
                console.error('Error fetching school data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
                ;
        }
    };

    if (loading) {
        return <Loding />;
    }

    const columns = [
        { label: 'School ID', key: 'schoolId' },
        { label: 'School Full Name', key: 'schoolFullName' },
        { label: 'Short Name', key: 'shortName' },
        { label: 'Is Active', key: 'isActive' },
        { label: 'Scroll News', key: 'scrollNews' },
        { label: 'Font Color', key: 'fontColor' },
        { label: 'Background Color', key: 'backgroundColor' },
        { label: 'Action', key: 'action' },
    ];

    const rows = [
        { label: 'Added By', key: 'addedBy' },
        { label: 'Added On', key: 'addedOn' },
        { label: 'Edit By', key: 'editBy' },
        { label: 'Edit On', key: 'editOn' },
    ]


    const data = schoolList ? schoolList.map((school) => ({
        schoolId: school.sch_id,
        schoolFullName: school.sch_nm,
        shortName: school.sch_short_nm,
        isActive: school.is_active ? 'Yes' : 'No',
        scrollNews: school.scroll_news_text,
        fontColor: school.text_color,
        backgroundColor: school.bg_color,
        action: (
            <div>
                <i className="fa-solid fa-pen-to-square mr-3"></i>
                <i className="fa-solid fa-trash-can text-danger mr-3"></i>
            </div>
        ),
        addedBy: school.entry_by,
        addedOn: school.entry_date,
        editBy: school.entry_by,
        editOn: school.edit_date,
    })) : [];


    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">


                    <Sidebar />

                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">School Master</h3>

                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4 mb-xl-0">
                                    <div className="d-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link " id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">Add</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show fade" id="add" role="tabpanel" aria-labelledby="add-tab">
                                        <div className="row">
                                            <div className="col-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center mb-3">
                                                            <h4 className="card-title mb-0 mr-2">School Entry Form</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <form className="forms-sample">
                                                            <h4 className="card-description text-primary font-weight-bolder">Primary Info</h4>
                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <label for="exampleInputName1">School Full Name <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="Full Name" />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label for="exampleInputName2">School Short Name <span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="exampleInputName2" placeholder="Short Name" />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label for="userType">Status</label><br />
                                                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                                                        <label className="btn btn-light py-2 active">
                                                                            <input type="radio" name="options" id="option1" autocomplete="off" checked /> Active
                                                                        </label>
                                                                        <label className="btn btn-light py-2">
                                                                            <input type="radio" name="options" id="option2" autocomplete="off" /> Inactive
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">Other Info</h4>
                                                            <div className="row">
                                                                {/* <div className="col-md-4 form-group">
                                                                <label for="exampleTextarea1">School Address</label>
                                                                <textarea className="form-control" id="exampleTextarea1" rows="1"></textarea>
                                                                </div> */}
                                                                <div className="col-md-4 form-group">
                                                                    <label for="exampleInputName1">School Address</label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="School Address" />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label for="exampleInputNumber">Contact Number</label>
                                                                    <input type="number" className="form-control" id="exampleInputNumber" placeholder="Enter Contact Number" />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label for="exampleInputName1">School Website</label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="School Website" />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label for="exampleInputEmail3">School Email Id</label>
                                                                    <input type="email" className="form-control" id="exampleInputEmail3" placeholder="School Email Id" />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">App Top Scrolled News</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label for="exampleTextarea1">Scroll News</label>
                                                                    <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">App Default Welcome Message IDs [ Comma(,) seprated ]</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group">
                                                                    <label for="exampleInputName1">Scroll News</label>
                                                                    <input type="text" className="form-control" id="exampleInputName1" placeholder="Please Enter Msg IDs" />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">Scholar Color</h4>
                                                            <div className="row">

                                                            </div>
                                                            <hr />
                                                            <h4 className="card-description text-primary font-weight-bolder">School Logo</h4>
                                                            <div className="row">

                                                            </div>

                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                            <button className="btn btn-light">Cancel</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane active" id="list" role="tabpanel" aria-labelledby="list-tab">
                                        <div className="row">
                                            <div className="col-md-12 grid-margin stretch-card">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <p className="card-title">School List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="table-responsive">
                                                                    <ExpandRowTable columns={columns} rows={rows} data={data} />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <nav>
                                                            <ul class="pagination justify-content-end">
                                                                <li class="page-item">
                                                                    <button class="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                                        disabled={currentPage === 1}>Previous</button>
                                                                </li>
                                                                <li class="page-item">
                                                                    <button class="page-link">{currentPage} of {totalPages}</button>
                                                                </li>
                                                                <li class="page-item">
                                                                    <button class="page-link" onClick={() => handlePageChange(currentPage + 1)}
                                                                        disabled={currentPage === totalPages}>Next</button>
                                                                </li>
                                                            </ul>
                                                        </nav>
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

export default SchoolMaster