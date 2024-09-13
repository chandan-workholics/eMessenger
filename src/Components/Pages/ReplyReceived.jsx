import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Template/Navbar'
import SidebarSettingPannel from '../Template/SidebarSettingPannel'
import Sidebar from '../Template/Sidebar'

const ReplyReceived = () => {
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
                            <h1>ReplyReceived</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReplyReceived