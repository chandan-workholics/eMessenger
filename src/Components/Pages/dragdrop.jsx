import React, { useState, useEffect } from 'react';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import callAPI from '../../commonMethod/api.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const MessageDraft = () => {
    const URL = process.env.REACT_APP_URL;
    const [inputFields, setInputFields] = useState([]);

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
                `${URL}/v1/admin/imageUpload_Use/imageUpload`,
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

    const handleSubmit = async (e) => {
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
                    msg_type: `${field.type}-CHAT`,
                    data_text: JSON.stringify(dataText),
                    order_number: inputFields.length + index + 1,
                    is_reply_required: 1,
                };
            }),
        ];
        try {
            const response = await callAPI.post('./msg/insertMsgData', {
                message_body: messageBody
            });
            if (response.status >= 200 && response.status < 300) {
                toast.success('Message submitted successfully');
                setInputFields([]);
            } else {
                toast.error('Failed to submit the message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form');
        }
    };

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
                </div>
            </div>

        </>
    );
};

export default MessageDraft;
