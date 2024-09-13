import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title mr-3">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#custom-messages" aria-expanded="false" aria-controls="custom-messages">
                            <i className="icon-layout menu-icon"></i>
                            <span className="menu-title mr-3">Custom Messages</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="custom-messages">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/import-scholar">Import Scholar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/message-draft">Message Draft</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reply-received">Reply Received</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/group-master">Group Master</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sub-group-master">Sub Group Master</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="collapse" href="#other-masters" aria-expanded="false" aria-controls="other-masters">
                            <i className="icon-columns menu-icon"></i>
                            <span className="menu-title mr-3">Other Masters</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="other-masters">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><Link className="nav-link" to="/user-management">Users Management</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/school-master">School Master</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/change-password">
                            <i className="icon-paper menu-icon"></i>
                            <span className="menu-title mr-3">Change Password</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <i className="icon-paper menu-icon"></i>
                            <span className="menu-title mr-3">Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar