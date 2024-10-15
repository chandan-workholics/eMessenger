import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import SidebarSettingPannel from '../Template/SidebarSettingPannel';
import Sidebar from '../Template/Sidebar';
import SortableTable from '../Template/SortableTable';

const MessageDraft = () => {

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
    const data = [
        {
            msgId: 1,
            subjectLineSchools: 'Reminder - 2 for Second Term outstanding fee/charges.',
            priority: '6',
            showUpto: '2024-10-01',
            lastPosted: '2024-09-25',
            lastPostedBy: 'Admin',
            recipients: 100,
            seen: 80,
            respond: 50,
            isActive: true,
            action: (
                <div>
                    <i className="fa-solid fa-pen-to-square text-warning mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-success mr-3"></i>
                    <Link to="/chat">
                        <i class="fa-solid fa-comment-dots text-info"></i>
                    </Link>
                </div>
            ),
        },
        {
            msgId: 2,
            subjectLineSchools: 'Reminder - 2 for Second Term outstanding fee/charges.',
            priority: '7',
            showUpto: '2024-10-02',
            lastPosted: '2024-09-26',
            lastPostedBy: 'User',
            recipients: 200,
            seen: 150,
            respond: 100,
            isActive: false,
            action: (
                <div>
                    <i className="fa-solid fa-pen-to-square text-warning mr-3"></i>
                    <i className="fa-solid fa-trash-can text-danger mr-3"></i>
                    <i className="fa-solid fa-paper-plane text-success mr-3"></i>
                    <Link to="/chat">
                        <i class="fa-solid fa-comment-dots text-info"></i>
                    </Link>
                </div>
            ),
        },
        // Add more rows as needed for pagination...
    ];

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
                                <div className="col-12 col-md-6 mb-md-4 mb-xl-0">
                                    <div className="d-flex align-items-center mb-3">
                                        <h3 className="font-weight-bold mr-2">Message Draft</h3>
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
                                                            <h4 className="card-title mb-0 mr-2">Message Entry</h4>
                                                            <p className="text-danger font-weight-bold mb-0">NEW</p>
                                                        </div>
                                                        <h5 className="card-description text-primary font-weight-bolder mt-3">General Info</h5>
                                                        {/* <form className="forms-sample">
                                                            <div className="row">
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="priority">Message Category<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="msgCategory">
                                                                        <option>Chat</option>
                                                                        <option>Group Chat</option>
                                                                        <option>Display</option>
                                                                        <option>input</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="subjectLine">Subject Line<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="priority">
                                                                        {[...Array(10).keys()].map((val) => (
                                                                            <option key={val + 1}>{val + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="showUpto">Show Upto Date & Time <span className="text-danger">*</span></label>
                                                                    <input type="date" className="form-control" id="showUpto" />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="schools">Schools<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="schools" placeholder="School Names" />
                                                                </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                                            <button className="btn btn-light">Cancel</button>
                                                        </form> */}
                                                        <form className="forms-sample">
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
                                                                    <input type="text" className="form-control" id="subjectLine" placeholder="Subject Line" />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="priority">Priority (1-High)<span className="text-danger">*</span></label>
                                                                    <select className="form-control" id="priority">
                                                                        {[...Array(10).keys()].map((val) => (
                                                                            <option key={val + 1}>{val + 1}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="showUpto">Show Upto Date & Time<span className="text-danger">*</span></label>
                                                                    <input type="date" className="form-control" id="showUpto" />
                                                                </div>
                                                                <div className="col-md-3 form-group">
                                                                    <label htmlFor="schools">Schools<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" id="schools" placeholder="School Names" />
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
                                                        <p className="card-title">Message List</p>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <form className="forms-sample">
                                                                    <div className="row">
                                                                        <div class="ml-auto col-md-3 form-group">
                                                                            <div class="input-group">
                                                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" />
                                                                                <div class="input-group-append">
                                                                                    <button class="btn btn-sm btn-primary px-4" type="button">Filter</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
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
