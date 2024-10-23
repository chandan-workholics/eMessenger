import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import Sidebar from '../Template/Sidebar';
import callAPI from '../../commonMethod/api.js';
import { toast } from 'react-toastify';

const MessageDraft = () => {

    const [loading, setLoading] = useState(true);



    const [displayFields, setDisplayFields] = useState([]);
    const [inputFields, setInputFields] = useState([]);

    const handleDisplayOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newDisplayFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(), // Generate unique id
            type: option,
        }));
        setDisplayFields([...displayFields, ...newDisplayFields]);
    };


    const handleInputOptionsChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        const newInputFields = selectedOptions.map(option => ({
            id: Date.now() + Math.random(), // Generate unique id
            type: option,
        }));
        setInputFields([...inputFields, ...newInputFields]);
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
        try {
            const response = await callAPI.post(`./msg/insertMsgData`, {
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

    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="tab-content border-0 p-0 w-100" id="myTabContent">
                                    <div className="tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">

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
                                                                <div className="col-12">
                                                                    <h5 className="card-description text-primary font-weight-bolder mt-3">Add New Row In Body</h5>
                                                                </div>


                                                                <div className="col-md-6 form-group">
                                                                    <label htmlFor="displayOptions">Display Options</label>
                                                                    <select className="form-control" id="displayOptions" onChange={handleDisplayOptionsChange}>
                                                                        <option value="" selected disabled>Select Display Options</option>
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
                                                                        <option value="" selected disabled>Select Input Options</option>
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
                                                                <div className="col-md-6">
                                                                    {displayFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} Output</label>
                                                                            <div className="d-flex align-items-end">
                                                                                {field.type === 'TitleDisplay' && (
                                                                                    <input type="text" className="form-control" />
                                                                                )}
                                                                                {field.type === 'TextDisplay' && (
                                                                                    <input type="text" className="form-control" />
                                                                                )}
                                                                                {field.type === 'LinkDisplay' && (
                                                                                    <input type="text" className="form-control" />
                                                                                )}
                                                                                {field.type === 'YoutubeDisplay' && (
                                                                                    <input type="text" className="form-control" />
                                                                                )}
                                                                                {field.type === 'ImageDisplay' && (
                                                                                    <input type="text" className="form-control" />
                                                                                )}
                                                                                <button type="button" className="btn border-0" onClick={() => deleteField(field.id, 'display')}  >
                                                                                    <i class="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>


                                                                <div className="col-md-6">
                                                                    {inputFields.map((field) => (
                                                                        <div key={field.id} className="col-12 form-group">
                                                                            <label>{field.type} Input</label>
                                                                            <div className="d-flex align-items-end">
                                                                                {field.type === 'Option' && (
                                                                                    <>
                                                                                        <label htmlFor="">Title:</label>
                                                                                        <input type="text" class="form-control" />
                                                                                        <input type="radio" className="form-control" />
                                                                                    </>
                                                                                )}
                                                                                {field.type === 'Checkbox' && (
                                                                                    <>
                                                                                        <label htmlFor="">Title:</label>
                                                                                        <input type="text" class="form-control" />
                                                                                        <input type="checkbox" className="form-control" />
                                                                                    </>

                                                                                )}
                                                                                {field.type === 'Textbox' && (
                                                                                    <>
                                                                                        <label htmlFor="">Title:</label>
                                                                                        <input type="text" class="form-control" />
                                                                                        <input type="text" className="form-control" />
                                                                                    </>

                                                                                )}
                                                                                {field.type === 'Textarea' && (
                                                                                    <>
                                                                                        <label htmlFor="">Title:</label>
                                                                                        <input type="text" class="form-control" />
                                                                                        <input type="textarea" rows="5" className="form-control" />
                                                                                    </>

                                                                                )}
                                                                                {field.type === 'Camera' && (
                                                                                    <>
                                                                                        <label htmlFor="">Title:</label>
                                                                                        <input type="text" class="form-control" />
                                                                                        <input type="file" className="form-control" />
                                                                                    </>

                                                                                )}
                                                                                {field.type === 'File' && (
                                                                                    <>
                                                                                        <label htmlFor="">Title:</label>
                                                                                        <input type="text" class="form-control" />
                                                                                        <input type="file" className="form-control" />
                                                                                    </>

                                                                                )}
                                                                                <button type="button" className="btn border-0" onClick={() => deleteField(field.id, 'input')}>
                                                                                    <i class="fa-solid fa-trash-can text-danger"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                            <button className="btn btn-light">Cancel</button>
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
