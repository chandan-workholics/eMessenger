import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/js/template.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const logout = () => {
        sessionStorage.clear();
    }

    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo mr-5" to="/">
                        <img src="images/logo.svg" className="mr-2" alt="logo" />
                    </Link>
                    <Link className="navbar-brand brand-logo-mini" to="/">
                        <img src="images/logo-mini.svg" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="icon-menu text-white"></span>
                    </button>
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            {/* <div className="input-group">
                                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                    <span className="input-group-text" id="search">
                                        <i className="icon-search text-white"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control text-white" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
                            </div> */}
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-toggle="dropdown">
                                <i className="icon-bell mx-0 text-white"></i>
                                <span className="count"></span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                <Link className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="ti-info-alt mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Application Error</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Just now
                                        </p>
                                    </div>
                                </Link>
                                <Link className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-warning">
                                            <i className="ti-settings mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">Settings</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            Private message
                                        </p>
                                    </div>
                                </Link>
                                <Link className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-info">
                                            <i className="ti-user mx-0"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <h6 className="preview-subject font-weight-normal">New user registration</h6>
                                        <p className="font-weight-light small-text mb-0 text-muted">
                                            2 days ago
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </li> */}
                        <li className="nav-item nav-profile dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown" id="profileDropdown">
                                <img src="images/faces/face28.jpg" alt="profile" />
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <Link to='/register' className="dropdown-item">
                                    <i className="ti-settings text-primary"></i>
                                    SignUp
                                </Link>
                                <Link className="dropdown-item">
                                    <i className="ti-settings text-primary"></i>
                                    Settings
                                </Link>
                                <Link onClick={() => logout()} className="dropdown-item" to="/">
                                    <i className="ti-power-off text-primary"></i>
                                    Logout
                                </Link>
                            </div>
                        </li>
                        {/* <li className="nav-item nav-settings d-none d-lg-flex">
                            <Link className="nav-link" to="#">
                                <i className="icon-ellipsis text-white"></i>
                            </Link>
                        </li> */}
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar