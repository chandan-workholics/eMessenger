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

    const handleNavLinkClick = () => {
        const sidebar = document.getElementById("sidebar");
        if (window.innerWidth <= 991) {
            sidebar.classList.remove("close");
        }
    };

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
                        <li className="nav-item nav-search d-none d-lg-block"></li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">

                        <li className="nav-item nav-profile dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown" id="profileDropdown">
                                <h2 className='mb-0'><i class="fa-solid fa-circle-user text-white"></i></h2>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <Link to='/register' className="dropdown-item">
                                    <i class="fa-solid fa-user-plus text-primary"></i>
                                    SignUp
                                </Link>
                                <Link onClick={() => logout()} className="dropdown-item" to="/">
                                    <i className="ti-power-off text-primary"></i>
                                    Logout
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" 
                    type="button" data-toggle="minimize" onClick={handleNavLinkClick}>
                        <span className="icon-menu text-white"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar