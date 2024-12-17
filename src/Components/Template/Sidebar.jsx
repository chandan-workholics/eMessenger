import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const logout = () => {
    sessionStorage.clear();
};

const Sidebar = () => {
    const URL = process.env.REACT_APP_URL;
    const token = sessionStorage.getItem('token');
    const admin_id = sessionStorage.getItem('admin_id');
    const [error, setError] = useState('');
    const [data, setData] = useState('');
    const [adminType, setAdminType] = useState(null);

    useEffect(() => {
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
                    setData(data?.data);
                    setAdminType(data?.data?.admin_type);
                } else {
                    setError(data.message || 'Invalid admin user name or password.');
                }
            } catch (error) {
                setError('An error occurred. Please try again later.');
                console.error('Error fetching admin details:', error);
            }
        };

        if (admin_id && token) {
            fetchAdminDetails();
        }
    }, [admin_id, token]);

    const superAdminMenuItems = [
        { to: "/dashboard", icon: "icon-grid", title: "Dashboard" },
        { to: "/message-draft", icon: "fa-solid fa-envelope", title: "Create Message" },
        { to: "/reply-received", icon: "fa-solid fa-inbox", title: "Inbox" },
        { to: "/notice-board", icon: "fa-solid fa-chalkboard", title: "Welcome Message" },
        { to: "/import-scholar", icon: "fa-solid fa-file-import", title: "Import Student" },
        { to: " ", icon: "fa-solid fa-file-import", title: "Fees Master" },
        { to: "/group-master", icon: "fa-solid fa-user-group", title: "Group" },
        { to: "/sub-group", icon: "fa-solid fa-users-line", title: "Sub Group" },
        { to: "/user-management", icon: "fa-solid fa-users-gear", title: "Users Management" },
        { to: "/school-master", icon: "fa-solid fa-graduation-cap", title: "School" },
        { to: "/support-master", icon: "fa-solid fa-graduation-cap", title: "Support" },
        { to: "/change-password", icon: "fa-solid fa-key", title: "Change Password" },
    ];

    const adminMenuItems = [
        { to: "/dashboard", icon: "icon-grid", title: "Dashboard" },
        { to: "/message-draft", icon: "fa-solid fa-envelope", title: "Create Message" },
        { to: "/reply-received", icon: "fa-solid fa-inbox", title: "Inbox" },
        { to: "/notice-board", icon: "fa-solid fa-chalkboard", title: "Welcome Message" },
        { to: "/import-scholar", icon: "fa-solid fa-file-import", title: "Import Student" },
        { to: "/fees-master", icon: "fa-solid fa-file-import", title: "Fees Master" },
        { to: "/group-master", icon: "fa-solid fa-user-group", title: "Group" },
        { to: "/sub-group", icon: "fa-solid fa-users-line", title: "Sub Group" },
        { to: "/user-management", icon: "fa-solid fa-users-gear", title: "Users Management" },
        { to: "/school-master", icon: "fa-solid fa-graduation-cap", title: "School" },
        { to: "/support-master", icon: "fa-solid fa-graduation-cap", title: "Support" },
        { to: "/change-password", icon: "fa-solid fa-key", title: "Change Password" },
    ];

    const managementMenuItems = [
        { to: "/dashboard", icon: "icon-grid", title: "Dashboard" },
        { to: "/message-draft", icon: "fa-solid fa-envelope", title: "Create Message" },
        { to: "/reply-received", icon: "fa-solid fa-inbox", title: "Inbox" },
        { to: "/group-master", icon: "fa-solid fa-user-group", title: "Group" },
        { to: "/sub-group", icon: "fa-solid fa-users-line", title: "Sub Group" },
        { to: "/school-master", icon: "fa-solid fa-graduation-cap", title: "School" },
        { to: "/change-password", icon: "fa-solid fa-key", title: "Change Password" },
    ];
    const userMenuItems = [
        { to: "/message-draft", icon: "fa-solid fa-envelope", title: "Create Message" },
        { to: "/user-management", icon: "fa-solid fa-users-gear", title: "Users Management" },
        { to: "/change-password", icon: "fa-solid fa-key", title: "Change Password" },
    ];

    // Choose the menu items based on user
    let menuItems;
    if (adminType === 'superadmin') {
        menuItems = superAdminMenuItems;
    } else if (adminType === 'user') {
        menuItems = userMenuItems;
    } else if (adminType === 'admin') {
        menuItems = adminMenuItems;
    } else if (adminType === 'management') {
        menuItems = managementMenuItems;
    }

    if (adminType === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    {menuItems.map(item => (
                        <li className="nav-item" key={item.to}>
                            <Link className="nav-link" to={item.to}>
                                <i className={`${item.icon} menu-icon`}></i>
                                <span className="menu-title mr-3">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                    <p className="text-secondary menu-text mt-2 mb-0">
                        <span>SECURITY</span> <i className="fas fa-ellipsis-h"></i>
                    </p>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={() => logout()} to="/">
                            <i className="fa-solid fa-arrow-right-from-bracket menu-icon"></i>
                            <span className="menu-title mr-3">Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;

