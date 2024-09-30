import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Loding = () => {
    return (
        <>
            <div className="container-scroller">
                {/*----- Navbar -----*/}
                <Navbar />

                <div className="container-fluid page-body-wrapper">
                    {/*----- SideBar -----*/}
                    <Sidebar />

                    <div className="main-panel loding-page">
                        <div className="content-wrapper">
                            <div className="">
                                <div className="loader-wrapper">
                                    <div className="loader">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
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

export default Loding