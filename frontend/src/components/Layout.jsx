import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/loginSlice';

const Layout = () => {

    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.login);

    //logout user
    const logoutHandle = () => {
        dispatch(logoutUser());
    }

    useEffect(() => {


    }, [dispatch, isAuthenticated])

    return (
        <>
            <ToastContainer />
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand fw-bold" >Mini Blog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            {/* <li className="nav-item">
                                <Link to="/" className="nav-link" >Home</Link>
                            </li> */}

                            {
                                isAuthenticated ?
                                    (
                                        <>
                                            <li className='text-white me-3'> Hello {user && user.name}</li>
                                            <li className="nav-item me-3">
                                                <Link to="/createblog" className="btn btn-white nav-link" > <i class="fa fa-plus-square-o"></i> Blog</Link>
                                            </li>
                                            <li className="nav-item">
                                                <button onClick={logoutHandle} className="btn btn-sm btn-danger text-white ms-2" >Logout</button>
                                            </li>
                                        </>
                                    ) :
                                    (
                                        <>
                                            {/* <li className="nav-item">
                                                <Link to="/register" className="nav-link" >Register</Link>
                                            </li> */}

                                            <li className="nav-item">
                                                <Link to="/Login" className="nav-link" >Login</Link>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />


            <footer className='bg-dark text-white'>
                <div className='d-flex justify-content-center align-items-center py-2 small'>
                    Design & Developed by <a href='http://www.dilshad.tech' target="_blank" className='text-decoration-none ms-2 '> dilshad</a>
                </div>
            </footer>

        </>
    )
}

export default Layout