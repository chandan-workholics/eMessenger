import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import callAPI from '../../commonMethod/api.js';
import Multiselect from "multiselect-react-dropdown";
import Loding from '../Template/Loding';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCreatedMsg = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state
    const [loading, setLoading] = useState(true);
    const [schoolList, setSchoolList] = useState([]);
    const [subgroup, setSubgroup] = useState([]);
    const [number, setNumber] = useState([]);
    const [parentsnumber, setParentsNumber] = useState([]);

    const [inputFields, setInputFields] = useState();


    const [datas, setDatas] = useState({
        msg_id: '',
        subject_text: '',
        show_upto: '',
        msg_priority: '1',
        msg_chat_type: '',
        msg_sgroup_id: '',
        is_reply_type: 0,
        is_reply_required_any: 0,
        is_active: 1,
        entry_by: 1,
        school_id: [],
        five_mobile_number: '',
        message_body: [],
    })

    const handleUpdateSchool = (val) => {
        const parsedParents = val.data.five_mobile_number
            ? JSON.parse(val.data.five_mobile_number).map((parent) => ({
                student_main_id: parent.student_main_id,
                mobile_no: parent.mobile_no,
            }))
            : [];
        setDatas({
            msg_id: val.data.msg_id,
            subject_text: val.data.subject_text || '',
            show_upto: val.data.show_upto || '',
            msg_priority: val.data.msg_priority || 1,
            msg_chat_type: val.data.msg_chat_type || '',
            msg_sgroup_id: val.data.msg_sgroup_id || '',
            is_reply_type: val.data.is_reply_type || 0,
            is_reply_required_any: val.data.is_reply_required_any || 0,
            is_active: val.data.is_active || 1,
            entry_by: val.data.entry_by || 1,
            school_id: val.data.schools?.map((val) => val?.sch_id) || [],
            five_mobile_number: parsedParents,
            message_body: val.data.msg_bodies || []
        });
        setInputFields(val.data.msg_bodies)
        setParentsNumber(parsedParents);
    };

    useEffect(() => {
        const fetchSendedData = async () => {
            try {
                const response = await callAPI.get(`/msg/get_MessageGroupData/${id}`);
                const val = response.data;
                handleUpdateSchool(val);
            } catch (error) {
                console.error("Error fetching message data:", error);
            }
        };
        fetchSendedData();
    }, [id]);


    //........................................... message box edit code .........................................



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
                const updatedFields = inputFields.map((field) =>
                    field.id === fieldId ? { ...field, linkValue: imageUrl } : field
                );
                setInputFields(updatedFields);
            } else {
                toast.error("Failed to load");
            }
        } catch (error) {
            toast.error("An error occurred during the upload.");
            console.error("Error uploading image:", error);
        }
    };

    const deleteField = (id) => {
        setInputFields(inputFields.filter(field => field.id !== id));
    };

    console.log('this is input field data', inputFields)
    //........................................... message box edit code .........................................


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await callAPI.get(`/school/getSchool?page=1&limit=200`);
                const responsetwo = await callAPI.get(`/msg/getSubGroupDetail?page=1&limit=200`);
                const responsethree = await callAPI.get(`/scholar/get_MainList_ScholarDetail`);
                setSchoolList(response.data.data || []);
                setSubgroup(responsetwo.data.data || []);
                setNumber(responsethree.data.data || []);
            } catch (error) {
                console.error('Error fetching school data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);// eslint-disable-next-line react-hooks/exhaustive-deps

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatas((prev) => ({
            ...prev,
            [name]: name === 'show_upto' ? new Date(value).toISOString() : value, // Convert back to ISO 8601
        }));
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        const messageBody = [
            ...inputFields.map((field, index) => {
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
                        dataText = { link: field.linkValue || '' };
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
                    msg_type: `${field.type}-${datas?.msg_chat_type}`,
                    data_text: JSON.stringify(dataText),
                    order_number: inputFields.length + index + 1,
                    is_reply_required: 1,
                };
            }),
        ];
        try {
            const response = await callAPI.put(`./msg/updateMessageGroupData/`, {
                msg_id: datas.msg_id,
                subject_text: datas.subject_text,
                show_upto: datas.show_upto,
                msg_priority: datas.msg_priority,
                msg_chat_type: datas.msg_chat_type,
                msg_sgroup_id: datas.msg_sgroup_id,
                is_reply_type: datas.is_reply_type,
                is_reply_required_any: datas.is_reply_required_any,
                is_active: datas.is_active,
                entry_by: datas.entry_by,
                school_id: datas.school_id,
                five_mobile_number: parentsnumber,
                message_body: messageBody
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success('Message submitted successfully');
                setDatas('');
                navigate(-1)
            } else {
                toast.error(response.message);
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
                                                            {/* message category here  */}
                                                            <div className="">
                                                                <label className="text-danger">{datas?.msg_chat_type}</label>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {/* ................................................upper div............................................ */}

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
                                                                name="show_upto"
                                                                value={datas?.show_upto ? datas.show_upto.split('T')[0] : ''} // Extract YYYY-MM-DD
                                                                onChange={handleChange}
                                                                required
                                                                min={minDate}
                                                            />
                                                        </div>


                                                        <div className="col-md-4 form-group">
                                                            <label htmlFor="schools">Schools<span className="text-danger">*</span></label>
                                                            <Multiselect
                                                                className="inputHead"
                                                                selectedValues={
                                                                    schoolList.filter(school =>
                                                                        datas.school_id?.includes(school.sch_id)
                                                                    )
                                                                }
                                                                onRemove={(event) => {
                                                                    const updatedSchoolIds = datas.school_id.filter(id =>
                                                                        !event.some(removed => removed.sch_id === id)
                                                                    );
                                                                    setDatas(prev => ({ ...prev, school_id: updatedSchoolIds }));
                                                                }}
                                                                onSelect={(event) => {
                                                                    const selectedSchoolIds = event.map(selected => selected.sch_id);
                                                                    setDatas(prev => ({ ...prev, school_id: selectedSchoolIds }));
                                                                }}
                                                                required
                                                                options={schoolList}
                                                                displayValue="sch_nm"
                                                                showCheckbox
                                                            />
                                                        </div>

                                                        <div className="col-md-4 form-group">
                                                            <label htmlFor="msgCategory">Group/Sub Group<span className="text-danger">*</span></label>
                                                            <select
                                                                className="form-control"
                                                                id="msgCategory"
                                                                name="msg_sgroup_id"
                                                                value={datas.msg_sgroup_id}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Group/Sub Group</option>
                                                                {subgroup?.map((val, index) => (
                                                                    <option key={index} value={val?.msg_sgroup_id}>
                                                                        {val?.msg_group_mst?.msg_group_name} - {val?.msg_sgroup_name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="col-md-4 form-group">
                                                            <label htmlFor="msgCategory">Add Student <span className="text-danger">(don’t select more than 5 numbers)</span></label>
                                                            <Multiselect
                                                                className="inputHead"
                                                                onRemove={(event) => {
                                                                    const updatedParents = parentsnumber.filter(parent =>
                                                                        !event.some(removed => removed.student_family_mobile_number === parent.mobile_no)
                                                                    );
                                                                    setParentsNumber(updatedParents);
                                                                }}
                                                                onSelect={(event) => {
                                                                    if (event.length <= 5) {
                                                                        const newParents = event.map(num => ({
                                                                            student_main_id: num.student_main_id,
                                                                            mobile_no: parseInt(num.student_family_mobile_number, 10)
                                                                        }));
                                                                        setParentsNumber(newParents);
                                                                    } else {
                                                                        alert("You can only select a maximum of 5 numbers.");
                                                                    }
                                                                }}
                                                                options={number} // All available students
                                                                displayValue="student_family_mobile_number"
                                                                selectedValues={number.filter(student =>
                                                                    parentsnumber.some(parent => parent.mobile_no === parseInt(student.student_family_mobile_number, 10))
                                                                )}
                                                                showCheckbox
                                                            />
                                                        </div>


                                                    </div>

                                                    {/* ................................................upper div............................................ */}




                                                    {/* Conditionally render multi-select inputs based on the selected message category */}

                                                    <div className="row">

                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="inputOptions">Chat Options</label>
                                                            <select className="form-control" id="inputOptions" onChange={handleInputOptionsChange}>
                                                                <option value="" selected>Select Options</option>

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

                                                        <div className="row">
                                                            <div className="col-md-6">

                                                                {inputFields.map((field) => (
                                                                    <div key={field.id} className="col-12 form-group">
                                                                        <label>{field.type} </label>
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

                                                                            {(field.type === 'IMAGE') && (
                                                                                <input
                                                                                    type="file"
                                                                                    className="form-control"
                                                                                    accept="image/*"
                                                                                    onChange={(e) => handleImageChange(e, field.id)}
                                                                                />
                                                                            )}

                                                                            <button
                                                                                type="button"
                                                                                className="btn border-0 mt-2"
                                                                                onClick={() => deleteField(field.id)}
                                                                            >
                                                                                <i className="fa-solid fa-trash-can text-danger"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {/* Conditionally render multi-select inputs based on the selected message category */}



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