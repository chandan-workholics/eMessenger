import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';
import callAPI from '../../commonMethod/api.js';
import Multiselect from "multiselect-react-dropdown";
import { toast } from 'react-toastify';

const MessageDraft = () => {
    // Handle adding new message fields
    const [loading, setLoading] = useState(true);
    const [schoolList, setSchoolList] = useState([]);
    const [subgroup, setSubgroup] = useState([]);
    const [school, setschool] = useState([]);
    const [number, setNumber] = useState([]);
    const [parentsnumber, setParentsNumber] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/school/getSchool?page=1&limit=200`);
            setSchoolList(response.data.data || []);
        } catch (error) {
            console.error('Error fetching school data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubGroup = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/msg/getSubGroupDetail?page=1&limit=200`);
            setSubgroup(response.data.data || []);
        } catch (error) {
            console.error('Error fetching SubGroupDetail data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchParentsNo = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`/scholar/get_MainList_ScholarDetail`);
            setNumber(response.data.data || []);
        } catch (error) {
            console.error('Error fetching ParentsNo data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
        fetchSubGroup();// eslint-disable-next-line react-hooks/exhaustive-deps
        fetchParentsNo();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [datas, setDatas] = useState({
        subject_text: '',
        show_upto: '',
        msg_priority: '1',
        msg_sgroup_id: '',
        is_reply_type: '0',
        is_reply_required_any: '1',
        is_active: '1',
        entry_by: '1',
        school_id: '',
        message_body: [],
    })

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDatas({ ...datas, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await callAPI.post(`./msg/insertMsgData`, {
                subject_text: datas?.subject_text,
                show_upto: datas?.show_upto,
                msg_priority: datas?.msg_priority,
                msg_sgroup_id: datas?.msg_sgroup_id,
                is_reply_type: datas?.is_reply_type,
                is_reply_required_any: datas?.is_reply_required_any,
                is_active: datas?.is_active,
                entry_by: datas?.entry_by,
                school_id: school?.map((val) => val?.sch_id),
                message_body: [
                    {
                        "msg_type": "text-display",
                        "data_text": "{\"text\":\"(School Name)<br>\\r\\n<br>\\r\\nOSC:_______________<br>\\r\\n<br>\\r\\nDate: ______________<br>\\r\\n<br>\\r\\nTo<br>Dear Parents<br>\\r\\n<br>\\r\\nSubject : Festival Celebration at school.<br>\\r\\n<br>\\r\\nReference : Our earlier Circular No. OSC: CIR/2023-24/____ Dated: ________<br>\\r\\n<br>\\r\\nYou are already delaying the deposition of fee of your ward, now it's our humble request to deposit the fee at the earliest. .<br>\"}",
                        "order_number": 1,
                        "is_reply_required": 0
                    },
                    {
                        "msg_type": "TITLE-DISPLAY",
                        "data_text": "{\"title\":\"*Celebration  (Most important and urgent).\"}",
                        "order_number": 1,
                        "is_reply_required": 0
                    },
                ],
            });
            if (response.status >= 200 && response.status < 300) {
                fetchData();
                toast.success('School added successfully');
            } else {
                toast.error('Failed to add School');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };

    // Handle adding new message fields



    const [msgCategory, setMsgCategory] = useState('');
    const [displayFields, setDisplayFields] = useState([]);
    const [inputFields, setInputFields] = useState([]);

    const handleCategoryChange = (e) => {
        setMsgCategory(e.target.value);
    };

    // Handle adding new display input fields
    const handleDisplayOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newDisplayFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(), // Generate unique id
            type: option,
        }));
        setDisplayFields([...displayFields, ...newDisplayFields]);
    };

    // Handle adding new input fields
    const handleInputOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newInputFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(), // Generate unique id
            type: option,
        }));
        setInputFields([...inputFields, ...newInputFields]);
    };

    // Delete field function
    const deleteField = (id, fieldType) => {
        if (fieldType === 'display') {
            setDisplayFields(displayFields.filter(field => field.id !== id));
        } else if (fieldType === 'input') {
            setInputFields(inputFields.filter(field => field.id !== id));
        }
    };

    //geting
    const [messageList, setMessageList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    const fetchListData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./msg/getMsgDetail?page=1&limit=50`);
            setMessageList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalRecords / rowsPerPage));
        } catch (error) {
            console.error('Error fetching notice data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListData();
    }, []);

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
    const data = messageList ? messageList?.map((val) => ({
        msgId: val?.msg_id,
        subjectLineSchools: val?.subject_text,
        priority: val?.msg_priority,
        showUpto: val?.show_upto,
        lastPosted: val?.entry_date,
        lastPostedBy: val?.entry_by,
        recipients: 'Na',
        seen: 'Na',
        respond: 'Na',
        isActive: val?.is_active,
        action: (
            <div>
                <i className="fa-solid fa-pen-to-square text-warning mr-3"></i>
                <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                <Link to="/send-message">
                    <i className="fa-solid fa-paper-plane text-success mr-3"></i>
                </Link>
                <Link to="/chat">
                    <i class="fa-solid fa-comment-dots text-info"></i>
                </Link>
            </div>
        ),
    })) : [];

    //geting

    console.log(datas)

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
                                        <h3 className="font-weight-bold mr-2">Create Message</h3>
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
                                                            <h4 className="card-title mb-0 mr-2">New Message</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <h5 className="card-description text-primary font-weight-bolder mt-3">General Info</h5>
                                                        <form className="forms-sample" onSubmit={handleSubmit}>
                                                            <div className="row">
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="msgCategory">Message Category<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="msgCategory" value={msgCategory} onChange={handleCategoryChange}>
                                                                        <option value="">Select Category</option>
                                                                        <option value="Chat">Chat</option>
                                                                        <option value="Group Chat">Group Chat</option>
                                                                        <option value="Display">Display</option>
                                                                        <option value="Input">Input</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="subjectLine">Subject Line<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" name='subject_text' value={datas?.subject_text} onChange={handleChange} />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="priority" name='msg_priority' value={datas?.msg_priority} onChange={handleChange}>
                                                                        {[...Array(10).keys()].map((val) => (
                                                                            <option key={val + 1}>{val + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="showUpto">Show Upto Date & Time<span className="text-danger">*</span></label>
                                                                    <input type="date" className="form-control" id="showUpto" name='show_upto' value={datas?.show_upto} onChange={handleChange} />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="schools">Schools<span className="text-danger">*</span></label>

                                                                    <Multiselect className='inputHead'
                                                                        onRemove={(event) => {
                                                                            console.log(event);
                                                                        }}
                                                                        onSelect={(event) => {
                                                                            setschool(event);
                                                                        }}
                                                                        options={schoolList}
                                                                        displayValue="sch_nm"
                                                                        showCheckbox />

                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="msgCategory">Group/Sub Group<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="msgCategory" name='msg_sgroup_id' value={datas?.msg_sgroup_id} onChange={handleChange}>
                                                                        <option value="">Select Group/Sub Group</option>
                                                                        {subgroup?.map((val) => {
                                                                            return (
                                                                                <option value={val?.msg_sgroup_id}>{val?.msg_group_mst?.msg_group_name}- {val?.msg_sgroup_name}</option>
                                                                            )
                                                                        })}

                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="msgCategory">Add Student<span className="text-danger">*</span></label>
                                                                    <Multiselect className='inputHead'
                                                                        onRemove={(event) => {
                                                                            console.log(event);
                                                                        }}
                                                                        onSelect={(event) => {
                                                                            setParentsNumber(event);
                                                                        }}
                                                                        options={number}
                                                                        displayValue="student_family_mobile_number"
                                                                        showCheckbox />
                                                                </div>
                                                            </div>

                                                            {/* Conditionally render multi-select inputs based on the selected message category */}
                                                            {msgCategory === 'Display' && (
                                                                <div className="row">
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="displayOptions">Display Options</label>
                                                                        <select className="form-control" id="displayOptions" multiple onChange={handleDisplayOptionsChange}>
                                                                            <option value="TitleDisplay">Title Display</option>
                                                                            <option value="TextDisplay">Text Display</option>
                                                                            <option value="LinkDisplay">Link Display</option>
                                                                            <option value="YoutubeDisplay">Youtube Display</option>
                                                                            <option value="ImageDisplay">Image Display</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {msgCategory === 'Input' && (
                                                                <div className="row">
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="inputOptions">Input Options</label>
                                                                        <select className="form-control" id="inputOptions" multiple onChange={handleInputOptionsChange}>
                                                                            <option value="Text">Option Input</option>
                                                                            <option value="Number">Checkbox Input</option>
                                                                            <option value="Dropdown">Textbox Input</option>
                                                                            <option value="Dropdown">Textarea Input</option>
                                                                            <option value="Dropdown">Camera Input</option>
                                                                            <option value="Dropdown">File Input</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Display additional fields dynamically based on the selected options */}
                                                            <div className="row">
                                                                {/* Display Options Fields */}
                                                                {displayFields.map((field) => (
                                                                    <div key={field.id} className="col-md-6 form-group">
                                                                        <label>{field.type} {field.type === 'Title Display' ? 'Text' : field.type === 'Text Display' ? 'Text' : 'Text'}</label>
                                                                        <div className="d-flex align-items-end">
                                                                            <input
                                                                                type={field.type === 'Title Display' || field.type === 'Text Display' || field.type === 'Link Display' || field.type === 'Youtube Display' || field.type === 'Image Display' ? 'text' : ''}
                                                                                className="form-control"
                                                                                placeholder={`Enter ${field.type} Text`}
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="btn border-0"
                                                                                onClick={() => deleteField(field.id, 'display')}
                                                                            >
                                                                                <i class="fa-solid fa-trash-can text-danger"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                {/* Input Options Fields */}
                                                                {inputFields.map((field) => (
                                                                    <div key={field.id} className="col-md-6 form-group">
                                                                        <label>{field.type} Input</label>
                                                                        <div className="d-flex align-items-end">
                                                                            {field.type === 'Text' && (
                                                                                <input type="text" className="form-control" placeholder="Enter Text" />
                                                                            )}
                                                                            {field.type === 'Number' && (
                                                                                <input type="number" className="form-control" placeholder="Enter Number" />
                                                                            )}
                                                                            {field.type === 'Dropdown' && (
                                                                                <select className="form-control">
                                                                                    <option value="Option 1">Option 1</option>
                                                                                    <option value="Option 2">Option 2</option>
                                                                                    <option value="Option 3">Option 3</option>
                                                                                </select>
                                                                            )}
                                                                            <button
                                                                                type="button"
                                                                                className="btn border-0"
                                                                                onClick={() => deleteField(field.id, 'input')}
                                                                            >
                                                                                <i class="fa-solid fa-trash-can text-danger"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Submit and Cancel buttons */}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageDraft;
