import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import callAPI from '../../commonMethod/api.js';
import Multiselect from "multiselect-react-dropdown";
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditCreatedMsg = () => {
    const location = useLocation();
    const { id } = location.state
    const [loading, setLoading] = useState(true);
    const [schoolList, setSchoolList] = useState([]);
    const [subgroup, setSubgroup] = useState([]);
    const [school, setschool] = useState([]);
    const [number, setNumber] = useState([]);
    const [parentsnumber, setParentsNumber] = useState([]);
    const [chattype, setchattype] = useState('');
    const [error, setError] = useState(null);
    // const [updateMessage, setUpdateMessage] = useState({});

    const [updateMessage, setUpdateMessage] = useState(null);
    const [msgData, setMsgData] = useState(null);

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

    const handleUpdateSchool = (val) => {
        setUpdateMessage(val);
        setDatas({
            subject_text: val.subject_text || '',
            show_upto: val.show_upto || '',
            msg_priority: val.msg_priority || '1',
            msg_sgroup_id: val.msg_sgroup_id || '',
            is_reply_type: val.is_reply_type || '0',
            is_reply_required_any: val.is_reply_required_any || '0',
            is_active: val.is_active || '1',
            entry_by: val.entry_by || '1',
            school_id: val.school_id || '',
            message_body: []
        });
    };

    useEffect(() => {
        const fetchSendedData = async () => {
            try {
                const response = await callAPI.get(`/msg/get_MessageGroupData/${id}`);
                const val = response.data;
                setMsgData(val);
                handleUpdateSchool(val);
            } catch (error) {
                console.error("Error fetching message data:", error);
            }
        };

        fetchSendedData();
    }, [id]);



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





    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        // setDatas((prevData) => ({ ...prevData, [name]: value }));
        setDatas({ ...datas, [name]: value })
    }

    // const handleMsgUpdate = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         await callAPI.put(`./msg/updateMessageGroupData/${updateMessage.msg_group_id}`, datas).then((response) => {
    //             if (response.status === 201 || response.status === 200) {
    //                 toast.success("message Updated Successfully");
    //             } else {
    //                 setError(response.message || 'Something went wrong');
    //             }
    //         });
    //     } catch (error) {
    //         setError('Error updating message: ' + error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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

    const handleFieldChange = (id, value) => {
        setDisplayFields(prevFields =>
            prevFields.map(field =>
                field.id === id ? { ...field, value } : field
            )
        );
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

    const handleUpdate = async (e) => {
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
            const response = await callAPI.put(`./msg/updateMessageGroupData/`, {
                msg_id: updateMessage.msg_group_id,
                subject_text: datas.subject_text,
                show_upto: datas.show_upto,
                msg_priority: datas.msg_priority,
                msg_chat_type: chattype,
                msg_sgroup_id: datas.msg_sgroup_id,
                is_reply_type: datas.is_reply_type,
                is_reply_required_any: msgCategory.includes("INPUT") ? "1" : "0",
                is_active: datas.is_active,
                entry_by: datas.entry_by,
                school_id: schoolList.map(val => val.sch_id),
                five_mobile_number: parentsnumber,
                message_body: messageBody
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success('Message submitted successfully');
                setDisplayFields([]);
                setInputFields([]);
                setDatas('');
            } else {
                toast.error('Failed to submit the message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };

    //geting
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Set to tomorrow
    const minDate = tomorrow.toISOString().split('T')[0]; // Get tomorrow's date in YYYY-MM-DD format

    if (loading) {
        return <Loding />;
    }

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
                                        <h3 className="font-weight-bold mr-2">Edit Message</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 grid-margin stretch-card">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-2">
                                                    <h4 className="card-title mb-0 mr-2">New Message</h4>
                                                    <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                </div>
                                                <h5 className="card-description text-primary font-weight-bolder mt-3">General Info</h5>
                                                <form className="forms-sample" onSubmit={handleUpdate}>
                                                    <div className="row">
                                                        <div className="col-md-4 form-group">
                                                            <label htmlFor="msgCategory">
                                                                Message Category<span className="text-danger"></span>
                                                            </label>
                                                            {/* <div className="d-flex justify-content-between form-control border-0">
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
                                                            </div> */}
                                                            <div className="">
                                                                <label>{datas?.data?.msg_chat_type}</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-4 form-group">
                                                            <label htmlFor="subjectLine">Subject Line<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" required name='subject_text' value={msgData?.data?.subject_text} onChange={handleChange} />
                                                        </div>
                                                        <div className="col-md-4 form-group">
                                                            <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                            <select className="form-control" id="priority" name='msg_priority' required onChange={handleChange}>
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
                                                            <select className="form-control" id="msgCategory" name='msg_sgroup_id' onChange={handleChange}>
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
                                                                            // onChange={(e) => {
                                                                            //     const updatedFields = displayFields.map((f) =>
                                                                            //         f.id === field.id ? { ...f, value: e.target.value } : f
                                                                            //     );
                                                                            //     setDisplayFields(updatedFields);
                                                                            // }}
                                                                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCreatedMsg