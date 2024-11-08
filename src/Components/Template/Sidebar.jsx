import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title mr-3">Dashboard</span>
                        </Link>
                    </li>
                    <p className="text-secondary menu-text mt-2 mb-0">
                        <span>SOCIAL</span> <i className="fas fa-ellipsis-h"></i>
                    </p>
                    <li className="nav-item">
                        <Link className="nav-link" to="/message-draft">
                            <i className="fa-solid fa-envelope menu-icon"></i>
                            <span className="menu-title mr-3">Create Message</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/reply-received">
                            <i className="fa-solid fa-inbox menu-icon"></i>
                            <span className="menu-title mr-3">Inbox</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notice-board">
                            <i className="fa-solid fa-chalkboard menu-icon"></i>
                            <span className="menu-title mr-3">Welcome Message</span>
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/welcome-message">
                            <i className="fa-solid fa-chalkboard menu-icon"></i>
                            <span className="menu-title mr-3">Welcome Message</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app-scroll-news">
                            <i className="fa-solid fa-chalkboard menu-icon"></i>
                            <span className="menu-title mr-3">App Scroll News</span>
                        </Link>
                    </li> */}
                    <p className="text-secondary menu-text mt-2 mb-0">
                        <span>MASTER</span> <i className="fas fa-ellipsis-h"></i>
                    </p>
                    <li className="nav-item">
                        <Link className="nav-link" to="/import-scholar">
                            <i className="fa-solid fa-file-import menu-icon"></i>
                            <span className="menu-title mr-3">Import Student</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/fees-master">
                            <i className="fa-solid fa-file-import menu-icon"></i>
                            <span className="menu-title mr-3">Fees Master</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/group-master">
                            <i className="fa-solid fa-user-group menu-icon"></i>
                            <span className="menu-title mr-3">Group</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sub-group">
                            <i className="fa-solid fa-users-line menu-icon"></i>
                            <span className="menu-title mr-3">Sub Group</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user-management">
                            <i className="fa-solid fa-users-gear menu-icon"></i>
                            <span className="menu-title mr-3">Users Management</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/school-master">
                            <i className="fa-solid fa-graduation-cap menu-icon"></i>
                            <span className="menu-title mr-3">School</span>
                        </Link>
                    </li>
                    <p className="text-secondary menu-text mt-2 mb-0">
                        <span className=''>SECURITY</span> <i className="fas fa-ellipsis-h"></i>
                    </p>
                    <li className="nav-item">
                        <Link className="nav-link" to="/change-password">
                            <i className="fa-solid fa-key menu-icon"></i>
                            <span className="menu-title mr-3">Change Password</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                            <span className="menu-title mr-3">Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar