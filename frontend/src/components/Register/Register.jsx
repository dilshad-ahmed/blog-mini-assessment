import React, { useState, useEffect } from 'react';
import '../Login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, resetError } from '../../features/user/loginSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

const Register = () => {

    const [inputs, setInputs] = useState({});

    const dispatch = useDispatch()
    const { loading, isAuthenticated, error } = useSelector((state) => state.login)
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((pre) => ({ ...pre, [name]: value }))
    }

    console.log(inputs)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(inputs));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetError())
        }
        if (isAuthenticated) {
            navigate("/")
        }
    }, [dispatch, isAuthenticated, error])

    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="reg-container">
                    <div className='modal-size-reg'>
                        <div>
                            <h5 className='text-center mb-3 text-muted  '>Create New Account</h5>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={inputs.name} onChange={handleChange} type="text" className="form-control form-control-modify" name="name" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                                        <label htmlFor="c1" className="input-text"> Name</label>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group">
                                <input value={inputs.email} onChange={handleChange} type="email" className="form-control form-control-modify" name="email" placeholder=' ' autoComplete="off" required />
                                <label className="input-text">Email</label>
                            </div>
                            <div className="form-group">
                                <input value={inputs.password} onChange={handleChange} type="password" className="form-control form-control-modify" name="password" placeholder=' ' autoComplete="off" required />
                                <label className="input-text">password</label>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <Link to="/login" className='btn btn-primary me-3' >Already have account ? Login </Link>
                                <button type='submit' className='btn btn2 '> Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register