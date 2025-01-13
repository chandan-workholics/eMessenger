import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const logout = () => {
    sessionStorage.clear();
}

const Sidebar = () => {
    const URL = process.env.REACT_APP_URL;
    const token = sessionStorage.getItem('token');
    const admin_id = sessionStorage.getItem('admin_id');
    const admin_type = sessionStorage.getItem('admin_type');


    const fetchAdminDetails = async () => {
        try {
            const response = await fetch(`${URL}/admin/getSingleAdmin/${admin_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                // Combine the admin_id with subordinates' admin_ids (if any) into a comma-separated string
                const combinedAdminIds = [
                    data.data.admin_id,
                    ...(data.data?.subordinateDetails?.map((val) => val.admin_id) || [])
                ].join(','); // Convert the array to a comma-separated string
                const combinedSchool = [
                    ...(data.data?.schoolDetails?.map((val) => val.sch_short_nm) || [])
                ].join(','); // Convert the array to a comma-separated string

                // Store the combined admin ids as a string in sessionStorage
                sessionStorage.setItem('access_id', combinedAdminIds);
                sessionStorage.setItem('school', combinedSchool);
            } else {
                console.log('Failed to fetch admin details');
            }
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    };

    useEffect(() => {
        fetchAdminDetails();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNavLinkClick = () => {
        const sidebar = document.getElementById("sidebar");
        if (window.innerWidth <= 991) {
            sidebar.classList.add("close");
        }
    };

    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav mt-2" style={{ height: '85vh', overflowY: 'scroll' }}>
                    {admin_type === 'superadmin' && (
                        <>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/dashboard" >
                                    <i className="icon-grid menu-icon"></i>
                                    <span className="menu-title mr-3">Dashboard</span>
                                </Link>
                            </li>
                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span>SOCIAL</span> <i className="fas fa-ellipsis-h"></i>
                            </p>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/message-draft">
                                    <i className="fa-solid fa-envelope menu-icon"></i>
                                    <span className="menu-title mr-3">Create Message</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/reply-received">
                                    <i className="fa-solid fa-inbox menu-icon"></i>
                                    <span className="menu-title mr-3">Inbox</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/notice-board">
                                    <i className="fa-solid fa-chalkboard menu-icon"></i>
                                    <span className="menu-title mr-3">Welcome Message</span>
                                </Link>
                            </li>

                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span>MASTER</span> <i className="fas fa-ellipsis-h"></i>
                            </p>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/import-scholar">
                                    <i className="fa-solid fa-file-import menu-icon"></i>
                                    <span className="menu-title mr-3">Import Student</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/fees-master">
                                    <i className="fa-solid fa-file-import menu-icon"></i>
                                    <span className="menu-title mr-3">Fees Master</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/group-master">
                                    <i className="fa-solid fa-user-group menu-icon"></i>
                                    <span className="menu-title mr-3">Group</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/sub-group">
                                    <i className="fa-solid fa-users-line menu-icon"></i>
                                    <span className="menu-title mr-3">Sub Group</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/user-management">
                                    <i className="fa-solid fa-users-gear menu-icon"></i>
                                    <span className="menu-title mr-3">Users Management</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/school-master">
                                    <i className="fa-solid fa-graduation-cap menu-icon"></i>
                                    <span className="menu-title mr-3">School</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/support-master">
                                    <i className="fa-solid fa-headset menu-icon"></i>
                                    <span className="menu-title mr-3">Support</span>
                                </Link>
                            </li>

                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span className="">SECURITY</span> <i className="fas fa-ellipsis-h"></i>
                            </p>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/change-password">
                                    <i className="fa-solid fa-key menu-icon"></i>
                                    <span className="menu-title mr-3">Change Password</span>
                                </Link>
                            </li>
                            <li className="nav-item mb-5">
                                <Link className="nav-link" onClick={() => logout()} to="/">
                                    <i className="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                                    <span className="menu-title mr-3">Logout</span>
                                </Link>
                            </li>
                        </>
                    )}

                    {admin_type === 'admin' && (
                        <>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/dashboard">
                                    <i className="icon-grid menu-icon"></i>
                                    <span className="menu-title mr-3">Dashboard</span>
                                </Link>
                            </li>
                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span>SOCIAL</span> <i className="fas fa-ellipsis-h"></i>
                            </p>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/message-draft">
                                    <i className="fa-solid fa-envelope menu-icon"></i>
                                    <span className="menu-title mr-3">Create Message</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/reply-received">
                                    <i className="fa-solid fa-inbox menu-icon"></i>
                                    <span className="menu-title mr-3">Inbox</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/notice-board">
                                    <i className="fa-solid fa-chalkboard menu-icon"></i>
                                    <span className="menu-title mr-3">Welcome Message</span>
                                </Link>
                            </li>

                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span>MASTER</span> <i className="fas fa-ellipsis-h"></i>
                            </p>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/import-scholar">
                                    <i className="fa-solid fa-file-import menu-icon"></i>
                                    <span className="menu-title mr-3">Import Student</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/fees-master">
                                    <i className="fa-solid fa-file-import menu-icon"></i>
                                    <span className="menu-title mr-3">Fees Master</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/group-master">
                                    <i className="fa-solid fa-user-group menu-icon"></i>
                                    <span className="menu-title mr-3">Group</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/sub-group">
                                    <i className="fa-solid fa-users-line menu-icon"></i>
                                    <span className="menu-title mr-3">Sub Group</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/user-management">
                                    <i className="fa-solid fa-users-gear menu-icon"></i>
                                    <span className="menu-title mr-3">Users Management</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/school-master">
                                    <i className="fa-solid fa-graduation-cap menu-icon"></i>
                                    <span className="menu-title mr-3">School</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/support-master">
                                    <i className="fa-solid fa-headset menu-icon ml-1"></i>
                                    <span className="menu-title mr-3">Support</span>
                                </Link>
                            </li>

                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span className="">SECURITY</span> <i className="fas fa-ellipsis-h"></i>
                            </p>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/change-password">
                                    <i className="fa-solid fa-key menu-icon"></i>
                                    <span className="menu-title mr-3">Change Password</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => logout()} to="/">
                                    <i className="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                                    <span className="menu-title mr-3">Logout</span>
                                </Link>
                            </li>
                        </>
                    )}

                    {admin_type === 'user' && (
                        <>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/dashboard">
                                    <i className="icon-grid menu-icon"></i>
                                    <span className="menu-title mr-3">Dashboard</span>
                                </Link>
                            </li>
                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span>SOCIAL</span> <i className="fas fa-ellipsis-h"></i>
                            </p>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/message-draft">
                                    <i className="fa-solid fa-envelope menu-icon"></i>
                                    <span className="menu-title mr-3">Create Message</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/reply-received">
                                    <i className="fa-solid fa-inbox menu-icon"></i>
                                    <span className="menu-title mr-3">Inbox</span>
                                </Link>
                            </li>




                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => logout()} to="/">
                                    <i className="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                                    <span className="menu-title mr-3">Logout</span>
                                </Link>
                            </li>
                        </>
                    )}

                    {admin_type === 'management' && (
                        <>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/dashboard">
                                    <i className="icon-grid menu-icon"></i>
                                    <span className="menu-title mr-3">Dashboard</span>
                                </Link>
                            </li>
                            <p className="text-secondary menu-text mt-2 mb-0">
                                <span>SOCIAL</span> <i className="fas fa-ellipsis-h"></i>
                            </p>

                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/message-draft">
                                    <i className="fa-solid fa-envelope menu-icon"></i>
                                    <span className="menu-title mr-3">Create Message</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/reply-received">
                                    <i className="fa-solid fa-inbox menu-icon"></i>
                                    <span className="menu-title mr-3">Inbox</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/group-master">
                                    <i className="fa-solid fa-user-group menu-icon"></i>
                                    <span className="menu-title mr-3">Group</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/sub-group">
                                    <i className="fa-solid fa-users-line menu-icon"></i>
                                    <span className="menu-title mr-3">Sub Group</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={handleNavLinkClick} to="/user-management">
                                    <i className="fa-solid fa-users-gear menu-icon"></i>
                                    <span className="menu-title mr-3">Users Management</span>
                                </Link>
                            </li>



                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => logout()} to="/">
                                    <i className="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                                    <span className="menu-title mr-3">Logout</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

        </>
    )
}

export default Sidebar