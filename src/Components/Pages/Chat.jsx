import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Template/Navbar';
import SidebarSettingPannel from '../Template/SidebarSettingPannel';
import Sidebar from '../Template/Sidebar';

const Chat = () => {
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
                                        <h3 className="font-weight-bold mr-2">Chat Box</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 chat-page bg-white">
                                <div className="col-md-12">
                                    <div className="row border rounded overflow-hidden">
                                        <div className="col-lg-4 col-xl-3 border-right p-0">
                                            <div className="p-3 border-bottom">
                                                <button className="btn theme-btn btn-info btn-sm mr-3">All Messages</button>
                                                <button className="btn btn-sm bg-263F53 text-white unread-btn mr-3">Group</button>
                                                <button className="btn btn-sm bg-263F53 text-white unread-btn">Personal</button>
                                            </div>
                                            <form action="" className="p-3 border-bottom">
                                                <div className="mb-3">
                                                    <input className="form-control mb-3" type="search" placeholder="Import Student" aria-label="Search" />
                                                </div>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">
                                                            <i className="fa-solid fa-magnifying-glass text-263F53"></i>
                                                        </span>
                                                    </div>
                                                    <input type="search" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                                        placeholder='Search' />
                                                </div>
                                            </form>
                                            <div className="chat-list overflow-auto">
                                                <div className="chat-person chat-person-active border-bottom p-3">
                                                    <h6 className="text-263F53 font-weight-bold mb-2">Saurabh Singh <span className="float-right text-8A8A8A font-weight-medium small">20-01-2022</span></h6>
                                                    <h6 className="text-8A8A8A font-weight-normal mb-2 small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, numquam accusamus cumque nemo velit.</h6>
                                                    <h6 className="text-8A8A8A font-weight-medium small">9555641793</h6>
                                                </div>
                                                <div className="chat-person border-bottom p-3">
                                                    <h6 className="text-263F53 font-weight-bold mb-2">Saurabh Singh <span className="float-right text-8A8A8A font-weight-medium small">20-01-2022</span></h6>
                                                    <h6 className="text-8A8A8A font-weight-normal mb-2 small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, numquam accusamus cumque nemo velit.</h6>
                                                    <h6 className="text-8A8A8A font-weight-medium small">9555641793</h6>
                                                </div>
                                                <div className="chat-person border-bottom p-3">
                                                    <h6 className="text-263F53 font-weight-bold mb-2">Saurabh Singh <span className="float-right text-8A8A8A font-weight-medium small">20-01-2022</span></h6>
                                                    <h6 className="text-8A8A8A font-weight-normal mb-2 small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, numquam accusamus cumque nemo velit.</h6>
                                                    <h6 className="text-8A8A8A font-weight-medium small">9555641793</h6>
                                                </div>
                                                <div className="chat-person border-bottom p-3">
                                                    <h6 className="text-263F53 font-weight-bold mb-2">Saurabh Singh <span className="float-right text-8A8A8A font-weight-medium small">20-01-2022</span></h6>
                                                    <h6 className="text-8A8A8A font-weight-normal mb-2 small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, numquam accusamus cumque nemo velit.</h6>
                                                    <h6 className="text-8A8A8A font-weight-medium small">9555641793</h6>
                                                </div>
                                                <div className="chat-person border-bottom p-3">
                                                    <h6 className="text-263F53 font-weight-bold mb-2">Saurabh Singh <span className="float-right text-8A8A8A font-weight-medium small">20-01-2022</span></h6>
                                                    <h6 className="text-8A8A8A font-weight-normal mb-2 small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure, numquam accusamus cumque nemo velit.</h6>
                                                    <h6 className="text-8A8A8A font-weight-medium small">9555641793</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-xl-9 p-0 overflow-hidden">
                                            <div className="chat-area h-100">
                                                <div className="row d-flex justify-content-between align-items-center border-bottom p-2">
                                                    <h6 className="col-md-6 text-263F53 font-weight-bold m-md-0 m-3">Saurabh Singh <span className='font-weight-semibold mx-3'>|</span>
                                                        <span className="text-27BAF0"> View Info <i className="fa-solid fa-share ml-2"></i> </span></h6>
                                                    <span className="col-md-6 d-flex justify-content-end">
                                                        <button className="btn btn-outline-info btn-sm bg-E9F9FF">Create Group</button>
                                                    </span>
                                                </div>
                                                <div className="chatt">

                                                </div>
                                                <div className="border-top p-3">
                                                    <button className="btn btn-outline-info btn-sm text-FC3534 bg-FFF2EB mr-3 py-2">Send assignment</button>
                                                    <div className="d-flex mt-3">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control small" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='write message......' />
                                                            <div className="input-group-append">
                                                                <Link to="" className="input-group-text" id="inputGroup-sizing-default">
                                                                    <i className="fa-solid fa-paperclip text-27BAF0" style={{ transform: "rotate(45deg)" }}></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <button className="btn theme-btn btn-info btn-sm ml-3 px-3">SEND</button>
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

export default Chat