import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';
import callAPI from '../../commonMethod/api.js';
import Multiselect from "multiselect-react-dropdown";
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import axios from 'axios';

const MessageDraft = () => {
    const [loading, setLoading] = useState(true);
    const [schoolList, setSchoolList] = useState([]);
    const [subgroup, setSubgroup] = useState([]);
    const [school, setschool] = useState([]);
    const [number, setNumber] = useState([]);
    const [parentsnumber, setParentsNumber] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [chattype, setchattype] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;


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
        is_reply_required_any: '0',
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
    const [chatFields, setChatFields] = useState([]);
    const [groupchatFields, setGroupChatFields] = useState([]);
    const [msgCategory, setMsgCategory] = useState('');

    const handleImageChange = async (e, fieldId) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        var requestOptions = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const fetchdata = await axios.post(
                `http://206.189.130.102:3550/api/v1/admin/imageUpload_Use/imageUpload`,
                formData,
                requestOptions
            );
            if (fetchdata.status === 200) {
                toast.success("Data Uploaded Successfully");
                const imageUrl = fetchdata.data.url;
                const updatedFields = displayFields.map((field) =>
                    field.id === fieldId ? { ...field, linkValue: imageUrl } : field
                );
                setDisplayFields(updatedFields);
            } else {
                toast.error("Failed to load");
            }
        } catch (error) {
            toast.error("An error occurred during the upload.");
            console.error("Error uploading image:", error);
        }
    };


    // const handleCategoryChange = (event) => {
    //     const { value, checked } = event.target;
    //     setchattype(event.target.value)
    //     if (checked) {
    //         setMsgCategory(prevCategories => [...prevCategories, value]);
    //     } else {
    //         setMsgCategory(prevCategories => prevCategories.filter(category => category !== value));
    //     }
    // };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setchattype(value); // Set the chat type based on selected value
        setMsgCategory([value]); // Update `msgCategory` to contain only the selected value
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

    const handleChatOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newChatFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(),
            type: option,
            title: '',
            options: '',
            placeholder: '',
        }));
        setChatFields([...chatFields, ...newChatFields]);
        e.target.value = '';
    };

    const handleGroupChatOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newGroupChatFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(),
            type: option,
            title: '',
            options: '',
            placeholder: '',
        }));
        setGroupChatFields([...groupchatFields, ...newGroupChatFields]);
        e.target.value = '';
    };

    const deleteField = (id, fieldType) => {
        if (fieldType === 'display') {
            setDisplayFields(displayFields.filter(field => field.id !== id));
        } else if (fieldType === 'input') {
            setInputFields(inputFields.filter(field => field.id !== id));
        }
        else if (fieldType === 'chat') {
            setChatFields(chatFields.filter(field => field.id !== id));
        }
        else if (fieldType === 'groupchat') {
            setGroupChatFields(groupchatFields.filter(field => field.id !== id));
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
                        dataText = { link: field.value || field.linkValue || '' };
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
                        dataText = { link: field.value || field.linkValue || '' };
                        break;
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
            ...chatFields.map((field, index) => {
                let dataText = {};
                switch (field.type) {
                    case 'TITLE':
                        dataText = { title: field.title || 'heelo' };
                        break;
                    case 'TEXT':
                        dataText = { text: field.title || '' };
                        break;
                    case 'LINK':
                        dataText = { link: field.title || '' };
                        break;
                    case 'YOUTUBE':
                        dataText = { link: field.title || '' };
                        break;
                    case 'IMAGE':
                        dataText = { link: field.title || field.linkValue || '' };
                        break;
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
                    msg_type: `${field.type}-INDIVIDUALCHAT`,
                    data_text: JSON.stringify(dataText),
                    order_number: chatFields.length + index + 1,
                    is_reply_required: 1,
                };
            }),
            ...groupchatFields.map((field, index) => {
                let dataText = {};
                switch (field.type) {
                    case 'TITLE':
                        dataText = { title: field.title || '' };
                        break;
                    case 'TEXT':
                        dataText = { text: field.title || '' };
                        break;
                    case 'LINK':
                        dataText = { link: field.title || '' };
                        break;
                    case 'YOUTUBE':
                        dataText = { link: field.title || '' };
                        break;
                    case 'IMAGE':
                        dataText = { link: field.title || field.linkValue || '' };
                        break;
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
                    msg_type: `${field.type}-GROUPCHAT`,
                    data_text: JSON.stringify(dataText),
                    order_number: groupchatFields.length + index + 1,
                    is_reply_required: 1,
                };
            }),
        ];
        try {
            const response = await callAPI.post('./msg/insertMsgData', {
                subject_text: datas?.subject_text,
                show_upto: datas?.show_upto,
                msg_priority: datas?.msg_priority,
                msg_chat_type: chattype,
                msg_sgroup_id: datas?.msg_sgroup_id,
                is_reply_type: datas?.is_reply_type,
                is_reply_required_any: msgCategory.includes('INPUT') ? 1 : 0,
                is_active: datas?.is_active,
                entry_by: datas?.entry_by,
                school_id: school?.map((val) => val?.sch_id),
                five_mobile_number: parentsnumber,
                message_body: messageBody
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success('Message submitted successfully');
                setDisplayFields([]);
                setInputFields([]);
                setDatas('');
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



    const fetchListData = async () => {
        try {
            setLoading(true);
            const response = await callAPI.get(`./msg/getMsgDetail?page=${currentPage}&limit=${rowsPerPage}`);
            setMessageList(response.data.data || []);
            setTotalPages(Math.ceil(response?.data?.pagination?.totalPages));
        } catch (error) {
            console.error('Error fetching notice data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListData();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

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
        isActive: (
            <div className="">
                <button onClick={() => handleToggleStatus(val?.msg_id, val?.is_active)} type="button" className="btn p-2">
                    {val?.is_active === 1 ? 'Deactivate' : 'Activate'}
                </button>
            </div>
        ),
        action: (
            <div>
                {val?.is_active === 1 ? <Link to={`/send-message/${val?.msg_id}`}> <i className="fa-solid fa-paper-plane text-success mr-3"></i></Link> : ''}
                <Link to='/edit-created-message' className="btn p-2">
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                </Link>
                <button type="button" className="btn p-2">
                    <i className="fa-solid fa-trash-can text-danger"></i>
                </button>
            </div>
        ),
    })) : [];

    //geting
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
    const minDate = tomorrow.toISOString().split('T')[0]; // Get tomorrow's date in YYYY-MM-DD format



    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    // Use min={minDate} in your input
    if (loading) {
        return <Loding />;
    }


    console.log(chatFields)

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
                                    <div className="d-flex align-items-center justify-content-end mb-3">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link px-4" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="true">
                                                        Add
                                                    </a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className="nav-link px-4 active" id="list-tab" data-toggle="tab" href="#list" role="tab" aria-controls="list" aria-selected="false">
                                                        List
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade " id="add" role="tabpanel" aria-labelledby="add-tab">
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
                                                                    <label htmlFor="msgCategory">
                                                                        Message Category<span className="text-danger">*</span>
                                                                    </label>
                                                                    <div className="d-flex justify-content-between form-control border-0">
                                                                        <div className="custom-control custom-radio">
                                                                            <input
                                                                                type="radio"
                                                                                className="custom-control-input"
                                                                                id="Chat"
                                                                                name="msgCategory"
                                                                                value="INDIVIDUALCHAT"
                                                                                onChange={handleCategoryChange}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor="Chat">
                                                                                Chat
                                                                            </label>
                                                                        </div>
                                                                        <div className="custom-control custom-radio">
                                                                            <input
                                                                                type="radio"
                                                                                className="custom-control-input"
                                                                                id="GroupChat"
                                                                                name="msgCategory"
                                                                                value="GROUPCHAT"
                                                                                onChange={handleCategoryChange}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor="GroupChat">
                                                                                Group Chat
                                                                            </label>
                                                                        </div>
                                                                        <div className="custom-control custom-radio">
                                                                            <input
                                                                                type="radio"
                                                                                className="custom-control-input"
                                                                                id="Display"
                                                                                name="msgCategory"
                                                                                value="DISPLAY"
                                                                                onChange={handleCategoryChange}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor="Display">
                                                                                Display
                                                                            </label>
                                                                        </div>
                                                                        <div className="custom-control custom-radio">
                                                                            <input
                                                                                type="radio"
                                                                                className="custom-control-input"
                                                                                id="Input"
                                                                                name="msgCategory"
                                                                                value="INPUT"
                                                                                onChange={handleCategoryChange}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor="Input">
                                                                                Input
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="subjectLine">Subject Line<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" required name='subject_text' value={datas?.subject_text} onChange={handleChange} />
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="priority" name='msg_priority' required value={datas?.msg_priority} onChange={handleChange}>
                                                                        {[...Array(10).keys()].map((val) => (
                                                                            <option key={val + 1}>{val + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4 form-group">
                                                                    <label htmlFor="showUpto">Show Upto Date & Time<span className="text-danger">*</span></label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control"
                                                                        id="showUpto"
                                                                        name='show_upto'
                                                                        value={datas?.show_upto}
                                                                        onChange={handleChange}
                                                                        required
                                                                        min={minDate}
                                                                    />
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
                                                                        required
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
                                                                            const updatedParents = parentsnumber.filter(parent =>
                                                                                !event.some(removed => removed.student_family_mobile_number === parent.mobile_no)
                                                                            );
                                                                            setParentsNumber(updatedParents);
                                                                        }}
                                                                        onSelect={(event) => {
                                                                            if (event.length <= 5) {
                                                                                const newParents = event.map(num => ({
                                                                                    student_main_id: num.student_main_id, // Make sure this key exists in your options
                                                                                    mobile_no: parseInt(num.student_family_mobile_number, 10) // Ensure this key exists
                                                                                }));
                                                                                setParentsNumber(newParents);
                                                                            } else {
                                                                                alert("You can only select a maximum of 5 numbers.");
                                                                            }
                                                                        }}
                                                                        options={number}
                                                                        displayValue="student_family_mobile_number"
                                                                        selectedValues={parentsnumber.map(parent => ({
                                                                            student_family_mobile_number: parent.mobile_no, // Ensure the display value matches
                                                                            student_main_id: parent.student_main_id // Include main ID if needed
                                                                        }))}
                                                                        showCheckbox
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Conditionally render multi-select inputs based on the selected message category */}

                                                            <div className="row">
                                                                {msgCategory.includes('INDIVIDUALCHAT') && (
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="inputOptions">Chat Options</label>
                                                                        <select className="form-control" id="chatOptions" onChange={handleChatOptionsChange}>
                                                                            <option value="" selected>Select Input Options</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
                                                                            <option value="TITLE">Title Display</option>
                                                                            <option value="TEXT">Text Display</option>
                                                                            <option value="LINK">Link Display</option>
                                                                            <option value="YOUTUBE">Youtube Display</option>
                                                                            <option value="IMAGE">Image Display</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
                                                                            <option value="OPTION">Option Input</option>
                                                                            <option value="CHECKBOX">Checkbox Input</option>
                                                                            <option value="TEXTBOX">Textbox Input</option>
                                                                            <option value="TEXTAREA">Textarea Input</option>
                                                                            <option value="CAMERA">Camera Input</option>
                                                                            <option value="FILE">File Input</option>
                                                                        </select>
                                                                    </div>
                                                                )}
                                                                {msgCategory.includes('GROUPCHAT') && (
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="inputOptions">Group Chat Options</label>
                                                                        <select className="form-control" id="groupchatOptions" onChange={handleGroupChatOptionsChange}>
                                                                            <option value="" selected>Select Input Options</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
                                                                            <option value="TITLE">Title Display</option>
                                                                            <option value="TEXT">Text Display</option>
                                                                            <option value="LINK">Link Display</option>
                                                                            <option value="YOUTUBE">Youtube Display</option>
                                                                            <option value="IMAGE">Image Display</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
                                                                            <option value="OPTION">Option Input</option>
                                                                            <option value="CHECKBOX">Checkbox Input</option>
                                                                            <option value="TEXTBOX">Textbox Input</option>
                                                                            <option value="TEXTAREA">Textarea Input</option>
                                                                            <option value="CAMERA">Camera Input</option>
                                                                            <option value="FILE">File Input</option>
                                                                        </select>
                                                                    </div>
                                                                )}
                                                                {msgCategory.includes('DISPLAY') && (
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="displayOptions">Display Options</label>
                                                                        <select className="form-control" id="displayOptions" onChange={handleDisplayOptionsChange}>
                                                                            <option value="" selected>Select Display Options</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
                                                                            <option value="TITLE">Title Display</option>
                                                                            <option value="TEXT">Text Display</option>
                                                                            <option value="LINK">Link Display</option>
                                                                            <option value="YOUTUBE">Youtube Display</option>
                                                                            <option value="IMAGE">Image Display</option>
                                                                        </select>
                                                                    </div>
                                                                )}
                                                                {msgCategory.includes('INPUT') && (
                                                                    <div className="col-md-6 form-group">
                                                                        <label htmlFor="inputOptions">Input Options</label>
                                                                        <select className="form-control" id="inputOptions" onChange={handleInputOptionsChange}>
                                                                            <option value="" selected>Select Input Options</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
                                                                            <option value="TITLE">Title Display</option>
                                                                            <option value="TEXT">Text Display</option>
                                                                            <option value="LINK">Link Display</option>
                                                                            <option value="YOUTUBE">Youtube Display</option>
                                                                            <option value="IMAGE">Image Display</option>
                                                                            <option value="" disabled></option>
                                                                            <hr className='py-3' />
                                                                            <option value="" disabled></option>
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
                                                                            <label>{field.type} DISPLAY</label>
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

                                                                                {(field.type === 'IMAGE') && (
                                                                                    <input
                                                                                        type="file"
                                                                                        className="form-control"
                                                                                        accept="image/*"
                                                                                        onChange={(e) => handleImageChange(e, field.id)} // Pass field ID to handleImageChange
                                                                                    />
                                                                                )}
                                                                                <button type="button" className="btn border-0" onClick={() => deleteField(field.id, 'display')}>
                                                                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                    {inputFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} INPUT</label>
                                                                            <div className="d-flex flex-column align-items-end">

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

                                                                    {chatFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} INPUT</label>
                                                                            <div className="d-flex flex-column align-items-start">

                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mb-2"
                                                                                    placeholder={`Enter title for ${field.type}`}
                                                                                    value={field.title || ''}
                                                                                    onChange={(e) => {
                                                                                        const updatedFields = chatFields.map((f) =>
                                                                                            f.id === field.id ? { ...f, title: e.target.value } : f
                                                                                        );
                                                                                        setChatFields(updatedFields);
                                                                                    }}
                                                                                />


                                                                                {(field.type === 'OPTION' || field.type === 'CHECKBOX') && (
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control mb-2"
                                                                                        placeholder={`Enter options for ${field.type} (e.g. Option1;Option2)`}
                                                                                        value={field.options || ''}
                                                                                        onChange={(e) => {
                                                                                            const updatedFields = chatFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, options: e.target.value } : f
                                                                                            );
                                                                                            setChatFields(updatedFields);
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
                                                                                            const updatedFields = chatFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                                                                            );
                                                                                            setChatFields(updatedFields);
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
                                                                                            const updatedFields = chatFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                                                                            );
                                                                                            setChatFields(updatedFields);
                                                                                        }}
                                                                                    />
                                                                                )}

                                                                                <button
                                                                                    type="button"
                                                                                    className="btn border-0 mt-2"
                                                                                    onClick={() => deleteField(field.id, 'chat')}
                                                                                >
                                                                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                    {groupchatFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} INPUT</label>
                                                                            <div className="d-flex flex-column align-items-start">

                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mb-2"
                                                                                    placeholder={`Enter title for ${field.type}`}
                                                                                    value={field.title || ''}
                                                                                    onChange={(e) => {
                                                                                        const updatedFields = groupchatFields.map((f) =>
                                                                                            f.id === field.id ? { ...f, title: e.target.value } : f
                                                                                        );
                                                                                        setGroupChatFields(updatedFields);
                                                                                    }}
                                                                                />


                                                                                {(field.type === 'OPTION' || field.type === 'CHECKBOX') && (
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control mb-2"
                                                                                        placeholder={`Enter options for ${field.type} (e.g. Option1;Option2)`}
                                                                                        value={field.options || ''}
                                                                                        onChange={(e) => {
                                                                                            const updatedFields = groupchatFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, options: e.target.value } : f
                                                                                            );
                                                                                            setGroupChatFields(updatedFields);
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
                                                                                            const updatedFields = groupchatFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                                                                            );
                                                                                            setGroupChatFields(updatedFields);
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
                                                                                            const updatedFields = groupchatFields.map((f) =>
                                                                                                f.id === field.id ? { ...f, placeholder: e.target.value } : f
                                                                                            );
                                                                                            setGroupChatFields(updatedFields);
                                                                                        }}
                                                                                    />
                                                                                )}

                                                                                <button
                                                                                    type="button"
                                                                                    className="btn border-0 mt-2"
                                                                                    onClick={() => deleteField(field.id, 'groupchat')}
                                                                                >
                                                                                    <i className="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
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
                                                        <nav>
                                                            <ul className="pagination justify-content-end">
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}
                                                                        disabled={currentPage === 1}>Previous</button>
                                                                </li>
                                                                {Array.from({ length: totalPages }, (_, index) => (
                                                                    <li
                                                                        key={index + 1}
                                                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                                                    >
                                                                        <button
                                                                            className="page-link"
                                                                            onClick={() => handlePageChange(index + 1)}
                                                                        >
                                                                            {index + 1}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                                <li className="page-item">
                                                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}
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
    );
};

export default MessageDraft;
