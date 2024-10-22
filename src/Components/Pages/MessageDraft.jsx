import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import callAPI from '../../commonMethod/api.js';

const MessageDraft = () => {
    const [displayFields, setDisplayFields] = useState([]);
    const [inputFields, setInputFields] = useState([]);

    const handleDisplayOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newDisplayFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(), // Consider using UUID for unique id
            type: option,
            value: '', // Initialize value to track user input
        }));
        setDisplayFields([...displayFields, ...newDisplayFields]);
        e.target.value = ''; // Reset the select field
    };

    const handleInputOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newInputFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(), // Consider using UUID for unique id
            type: option,
            title: '', // Initialize title for input fields
            options: '', // Initialize options for select-type inputs
            placeholder: '', // Initialize placeholder for text inputs
        }));
        setInputFields([...inputFields, ...newInputFields]);
        e.target.value = ''; // Reset the select field
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

        // Prepare data for the API request
        const messageBody = [
            ...displayFields.map((field, index) => {
                let dataText = {};
                switch (field.type) {
                    case 'TitleDisplay':
                        dataText = { title: field.value || '' }; // Use actual input value
                        break;
                    case 'TextDisplay':
                        dataText = { text: field.value || '' }; // Use actual input value
                        break;
                    case 'LinkDisplay':
                        dataText = { title: field.value || '', link: '' }; // Add link as needed
                        break;
                    case 'YoutubeDisplay':
                        dataText = { title: field.value || '', link: '' }; // Add link as needed
                        break;
                    case 'ImageDisplay':
                        dataText = { link: field.value || '' }; // Use actual input value
                        break;
                    default:
                        break;
                }
                return {
                    msg_type: `${field.type.toLowerCase()}-display`, // Convert to lowercase
                    data_text: JSON.stringify(dataText), // Stringify the data text
                    order_number: index + 1,
                    is_reply_required: 0,
                };
            }),
            ...inputFields.map((field, index) => {
                let dataText = {};
                switch (field.type) {
                    case 'Option':
                        dataText = { title: field.title || '', options: field.options || '' }; // Use actual input values
                        break;
                    case 'Checkbox':
                        dataText = { title: field.title || '', options: field.options || '' }; // Use actual input values
                        break;
                    case 'Textbox':
                        dataText = { title: field.title || '', placeholder: field.placeholder || '' }; // Use actual input values
                        break;
                    case 'Textarea':
                        dataText = { title: field.title || '', placeholder: field.placeholder || '' }; // Use actual input values
                        break;
                    case 'Camera':
                    case 'File':
                        dataText = { title: field.title || '' }; // Use actual input values
                        break;
                    default:
                        break;
                }
                return {
                    msg_type: `${field.type.toLowerCase()}-input`, // Convert to lowercase
                    data_text: JSON.stringify(dataText), // Stringify the data text
                    order_number: displayFields.length + index + 1,
                    is_reply_required: 1,
                };
            }),
        ];

        try {
            const response = await callAPI.post('./msg/insertMsgData', { message_body: messageBody });
            if (response.status >= 200 && response.status < 300) {
                toast.success('Message submitted successfully');
                // Clear the fields if needed
                setDisplayFields([]);
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
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-12 grid-margin stretch-card">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h4 className="card-title">New Message</h4>
                                            <form className="forms-sample" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="displayOptions">Display Options</label>
                                                        <select className="form-control" id="displayOptions" onChange={handleDisplayOptionsChange}>
                                                            <option value="" disabled>Select Display Options</option>
                                                            <option value="TitleDisplay">Title Display</option>
                                                            <option value="TextDisplay">Text Display</option>
                                                            <option value="LinkDisplay">Link Display</option>
                                                            <option value="YoutubeDisplay">Youtube Display</option>
                                                            <option value="ImageDisplay">Image Display</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="inputOptions">Input Options</label>
                                                        <select className="form-control" id="inputOptions" onChange={handleInputOptionsChange}>
                                                            <option value="" disabled>Select Input Options</option>
                                                            <option value="Option">Option Input</option>
                                                            <option value="Checkbox">Checkbox Input</option>
                                                            <option value="Textbox">Textbox Input</option>
                                                            <option value="Textarea">Textarea Input</option>
                                                            <option value="Camera">Camera Input</option>
                                                            <option value="File">File Input</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    {/* Display Fields */}
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

                                                    {/* Input Fields */}
                                                    <div className="col-md-6">
                                                        {inputFields.map((field) => (
                                                            <div key={field.id} className="col-12 form-group">
                                                                <label>{field.type} Input</label>
                                                                <div className="d-flex align-items-end">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder={`Enter ${field.type}`}
                                                                        value={field.title || ''}
                                                                        onChange={(e) => {
                                                                            const updatedFields = inputFields.map((f) =>
                                                                                f.id === field.id ? { ...f, title: e.target.value } : f
                                                                            );
                                                                            setInputFields(updatedFields);
                                                                        }}
                                                                    />
                                                                    <button type="button" className="btn border-0" onClick={() => deleteField(field.id, 'input')}>
                                                                        <i className="fa-solid fa-trash-can text-danger"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                <button type="button" className="btn btn-light">Cancel</button>
                                            </form>
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
