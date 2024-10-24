import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';
import callAPI from '../../commonMethod/api.js';
import Multiselect from "multiselect-react-dropdown";
import { toast } from 'react-toastify';

const MessageDraft = () => {
    const [loading, setLoading] = useState(true);
    const [schoolList, setSchoolList] = useState([]);
    const [subgroup, setSubgroup] = useState([]);
    const [school, setschool] = useState([]);
    const [number, setNumber] = useState([]);
    const [parentsnumber, setParentsNumber] = useState([]);

    const [deleteid, Setdeleteid] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        fetchData();
        fetchSubGroup();
        fetchParentsNo();
    }, []);// eslint-disable-next-line react-hooks/exhaustive-deps

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

    const [displayFields, setDisplayFields] = useState([]);
    const [inputFields, setInputFields] = useState([]);
    const [msgCategory, setMsgCategory] = useState('');

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // Add the category to the array
            setMsgCategory(prevCategories => [...prevCategories, value]);
        } else {
            // Remove the category from the array
            setMsgCategory(prevCategories => prevCategories.filter(category => category !== value));
        }
    };

    const handleDisplayOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newDisplayFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(),
            type: option,
            value: '',
        }));
        setDisplayFields([...displayFields, ...newDisplayFields]);
        e.target.value = '';
    };

    const handleInputOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newInputFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(),
            type: option,
            title: '',
            options: '',
            placeholder: '',
        }));
        setInputFields([...inputFields, ...newInputFields]);
        e.target.value = '';
    };

    const deleteField = (id, fieldType) => {
        if (fieldType === 'display') {
            setDisplayFields(displayFields.filter(field => field.id !== id));
        } else if (fieldType === 'input') {
            setInputFields(inputFields.filter(field => field.id !== id));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const messageBody = [
            ...displayFields.map((field, index) => {
                let dataText = {};
                switch (field.type) {
                    case 'TITLE':
                        dataText = { title: field.value || '' };
                        break;
                    case 'TEXT':
                        dataText = { text: field.value || '' };
                        break;
                    case 'LINK':
                        dataText = { link: field.value || '' };
                        break;
                    case 'YOUTUBE':
                        dataText = { link: field.value || '' };
                        break;
                    case 'IMAGE':
                        dataText = { link: field.value || '' };
                        break;
                    default:
                        break;
                }
                return {
                    msg_type: `${field.type}-DISPLAY`,
                    data_text: JSON.stringify(dataText),
                    order_number: index + 1,
                    is_reply_required: 0,
                };
            }),
            ...inputFields.map((field, index) => {
                let dataText = {};
                switch (field.type) {
                    case 'OPTION':
                        dataText = { title: field.title || '', options: field.options || '' };
                        break;
                    case 'CHECKBOX':
                        dataText = { title: field.title || '', options: field.options || '' };
                        break;
                    case 'TEXTBOX':
                        dataText = { title: field.title || '', placeholder: field.placeholder || '' };
                        break;
                    case 'TEXTAREA':
                        dataText = { title: field.title || '', placeholder: field.placeholder || '' };
                        break;
                    case 'CAMERA':
                    case 'File':
                        dataText = { title: field.title || '' };
                        break;
                    default:
                        break;
                }
                return {
                    msg_type: `${field.type}-INPUT`,
                    data_text: JSON.stringify(dataText),
                    order_number: displayFields.length + index + 1,
                    is_reply_required: 1,
                };
            }),
        ];
        try {
            const response = await callAPI.post('./msg/insertMsgData', {
                subject_text: datas?.subject_text,
                show_upto: datas?.show_upto,
                msg_priority: datas?.msg_priority,
                msg_sgroup_id: datas?.msg_sgroup_id,
                is_reply_type: datas?.is_reply_type,
                is_reply_required_any: datas?.is_reply_required_any,
                is_active: datas?.is_active,
                entry_by: datas?.entry_by,
                school_id: school?.map((val) => val?.sch_id),
                message_body: messageBody
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success('Message submitted successfully');
                setDisplayFields([]);
                setInputFields([]);
                fetchListData();
            } else {
                toast.error('Failed to submit the message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
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


    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = (id) => {
        Setdeleteid(id);
        setIsDeleteModalOpen(true)
    };

    function deleteItem(id) {
        callAPI.del(`./msg/delete_web_single_msg_master?msg_id=${id}`).then(async (response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success('Delete Item Successfully');
                closeDeleteModal();
                fetchListData();
            }
            else {
                toast.error('something went wrong');
            }
        });
    }

    const handleToggleStatus = async (msgId, isActive) => {
        try {
            const response = await callAPI.get(`./msg/toggleMessageStatus?msg_id=${msgId}`);

            if (response.status === 200) {
                toast.success(`Message status toggled successfully to ${isActive === 1 ? 'Inactive' : 'Active'}`);
                fetchListData();
            }
        } catch (error) {
            console.error("Error toggling message status:", error);
        }
    };

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
        showUpto: val?.show_upto ? new Date(val?.show_upto).toLocaleDateString('en-GB') : '', // Format date,
        lastPosted: val?.entry_date,
        lastPostedBy: val?.entry_by,
        recipients: 'Na',
        seen: 'Na',
        respond: 'Na',
        isActive: val?.is_active,
        action: (
            <div>
                {/* {val?.is_active === 1 ? <button onClick={() => handleDelete(val?.msg_id)} type="button" className="btn p-2">
                    <i className="fa-solid fa-trash-can text-danger"></i>
                </button> : ''} */}
                {val?.is_active === 1 ? <Link to={`/send-message/${val?.msg_id}`}> <i className="fa-solid fa-paper-plane text-success mr-3"></i></Link> : ''}
                <button onClick={() => handleToggleStatus(val?.msg_id, val?.is_active)} type="button" className="btn p-2">
                    {val?.is_active === 1 ? 'Deactivate' : 'Activate'}
                </button>
            </div>
        ),
    })) : [];

    //geting

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
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="subjectLine">Subject Line<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" name='subject_text' value={datas?.subject_text} onChange={handleChange} />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="priority" name='msg_priority' value={datas?.msg_priority} onChange={handleChange}>
                                                                        {[...Array(10).keys()].map((val) => (
                                                                            <option key={val + 1}>{val + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="showUpto">Show Upto Date & Time<span className="text-danger">*</span></label>
                                                                    <input type="date" className="form-control" id="showUpto" name='show_upto' value={datas?.show_upto} onChange={handleChange} />
                                                                </div>
                                                                <div className="col-md-4 form-group">
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
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="msgCategory">Group/Sub Group<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="msgCategory" name='msg_sgroup_id' value={datas?.msg_sgroup_id} onChange={handleChange}>
                                                                        <option value="">Select Group/Sub Group</option>
                                                                        {subgroup?.map((val, index) => {
                                                                            return (
                                                                                <option key={index} value={val?.msg_sgroup_id}>{val?.msg_group_mst?.msg_group_name}- {val?.msg_sgroup_name}</option>
                                                                            )
                                                                        })}

                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="msgCategory">Add Student <span className="text-danger">(dont select more then 5 numbers)</span> </label>


                                                                    <Multiselect
                                                                        className='inputHead'
                                                                        onRemove={(event) => {
                                                                            console.log(event);
                                                                            setParentsNumber(event);
                                                                        }}
                                                                        onSelect={(event) => {
                                                                            if (event.length <= 5) {
                                                                                setParentsNumber(event);
                                                                            } else {
                                                                                alert("You can only select a maximum of 5 numbers.");
                                                                            }
                                                                        }}
                                                                        options={number}
                                                                        displayValue="student_family_mobile_number"
                                                                        selectedValues={parentsnumber}
                                                                        showCheckbox
                                                                    />


                                                                </div>
                                                            </div>

                                                            {/* Conditionally render multi-select inputs based on the selected message category */}


                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="msgCategory">Message Category<span className="text-danger">*</span></label>
                                                                    <div className="d-flex justify-content-between form-control border-0">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="Chat" value="Chat" onChange={handleCategoryChange} />
                                                                            <label className="custom-control-label" htmlFor="Chat">Chat</label>
                                                                        </div>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="GroupChat" value="Group Chat" onChange={handleCategoryChange} />
                                                                            <label className="custom-control-label" htmlFor="GroupChat">Group Chat</label>
                                                                        </div>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="Display" value="Display" onChange={handleCategoryChange} />
                                                                            <label className="custom-control-label" htmlFor="Display">Display</label>
                                                                        </div>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="Input" value="Input" onChange={handleCategoryChange} />
                                                                            <label className="custom-control-label" htmlFor="Input">Input</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                {msgCategory.includes('Display') && (
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="displayOptions">Display Options</label>
                                                                        <select className="form-control" id="displayOptions" onChange={handleDisplayOptionsChange}>
                                                                            <option value="" disabled selected hidden>Select Display Options</option>
                                                                            <option value="TITLE">Title Display</option>
                                                                            <option value="TEXT">Text Display</option>
                                                                            <option value="LINK">Link Display</option>
                                                                            <option value="YOUTUBE">Youtube Display</option>
                                                                            <option value="IMAGE">Image Display</option>
                                                                        </select>
                                                                    </div>
                                                                )}
                                                                {msgCategory.includes('Input') && (
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="inputOptions">Input Options</label>
                                                                        <select className="form-control" id="inputOptions" onChange={handleInputOptionsChange}>
                                                                            <option value="" disabled selected hidden>Select Input Options</option>
                                                                            <option value="OPTION">Option Input</option>
                                                                            <option value="CHECKBOX">Checkbox Input</option>
                                                                            <option value="TEXTBOX">Textbox Input</option>
                                                                            <option value="TEXTAREA">Textarea Input</option>
                                                                            <option value="CAMERA">Camera Input</option>
                                                                            <option value="FILE">File Input</option>
                                                                        </select>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="row">

                                                                <div className="col-md-6">
                                                                    {displayFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} Output</label>
                                                                            <div className="d-flex align-items-end">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder={`Enter ${field.type}`}
                                                                                    value={field.value || ''}
                                                                                    onChange={(e) => {
                                                                                        const updatedFields = displayFields.map((f) =>
                                                                                            f.id === field.id ? { ...f, value: e.target.value } : f
                                                                                        );
                                                                                        setDisplayFields(updatedFields);
                                                                                    }}
                                                                                />
                                                                                <button type="button" className="btn border-0" onClick={() => deleteField(field.id, 'display')}>
                                                                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>


                                                                <div className="col-md-6">
                                                                    {inputFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} Input</label>
                                                                            <div className="d-flex flex-column align-items-start">

                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mb-2"
                                                                                    placeholder={`Enter title for ${field.type}`}
                                                                                    value={field.title || ''}
                                                                                    onChange={(e) => {
                                                                                        const updatedFields = inputFields.map((f) =>
                                                                                            f.id === field.id ? { ...f, title: e.target.value } : f
                                                                                        );
                                                                                        setInputFields(updatedFields);
                                                                                    }}
                                                                                />


                                                                                {(field.type === 'OPTION' || field.type === 'CHECKBOX') && (
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control mb-2"
                                                                                        placeholder={`Enter options for ${field.type} (e.g. Option1;Option2)`}
                                                                                        value={field.options || ''}
                                                                                        onChange={(e) => {
                                                                                            const updatedFields = inputFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, options: e.target.value } : f
                                                                                            );
                                                                                            setInputFields(updatedFields);
                                                                                        }}
                                                                                    />
                                                                                )}

                                                                                {field.type === 'TEXTBOX' && (
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control mb-2"
                                                                                        placeholder="Enter placeholder for Textbox"
                                                                                        value={field.placeholder || ''}
                                                                                        onChange={(e) => {
                                                                                            const updatedFields = inputFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                                                                            );
                                                                                            setInputFields(updatedFields);
                                                                                        }}
                                                                                    />
                                                                                )}

                                                                                {field.type === 'TEXTAREA' && (
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control mb-2"
                                                                                        placeholder="Enter placeholder for Textarea"
                                                                                        value={field.placeholder || ''}
                                                                                        onChange={(e) => {
                                                                                            const updatedFields = inputFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                                                                            );
                                                                                            setInputFields(updatedFields);
                                                                                        }}
                                                                                    />
                                                                                )}

                                                                                <button
                                                                                    type="button"
                                                                                    className="btn border-0 mt-2"
                                                                                    onClick={() => deleteField(field.id, 'input')}
                                                                                >
                                                                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                </div>

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

                                    {isDeleteModalOpen && (
                                        <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header d-flex align-items-center bg-ffe2e5 py-3">
                                                        <h4 className="modal-title font-weight-bold text-primary">Warning!</h4>
                                                        <button type="button" className="close" onClick={closeDeleteModal}>
                                                            <i class="fa-solid fa-xmark fs-3 text-primary"></i>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body p-3">
                                                        <div className="modal-body">
                                                            <h5 className="text-primary text-center">Do you want to permanently delete?</h5>
                                                            <img src="images/deleteWarning.png" alt="" className="w-100 m-auto" />
                                                        </div>
                                                        <div className="modal-footer pb-0">
                                                            <div className="d-flex align-items-center">
                                                                <button type="button" className="btn btn-danger mr-3" onClick={() => deleteItem(deleteid)}>Yes</button>
                                                                <button type="button" className="btn btn-outline-danger" onClick={closeDeleteModal}>No</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}


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
