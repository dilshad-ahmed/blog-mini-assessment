import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./login.css"
import { userLogin, resetError } from '../../features/user/loginSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Login = () => {

    const [inputs, setInputs] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, isAuthenticated, error } = useSelector((state) => state.login)

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setInputs((pre) => ({ ...pre, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin(inputs))

    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(resetError())
        }

        if (isAuthenticated) {
            navigate("/")
        }

    }, [dispatch, isAuthenticated, error])


    return (
        <>
            <section className=' d-flex vh-100 align-items-center justify-content-center bg-light'>
                <div className='login-container'>
                    <form className="form-horizontal form-container" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input onChange={handleChange} value={inputs.email} type="email" className="form-control form-control-modify " name="email" placeholder=' ' id='1' autoComplete="off" autoFocus required />
                            <label htmlFor="1" className="input-text">Email</label>
                        </div>
                        <div className="form-group">
                            <input onChange={handleChange} value={inputs.password} type="password" className="form-control form-control-modify" name="password" placeholder=' ' id='2' required />
                            <label htmlFor="2" className="input-text">Password</label>
                        </div>
                        <div className='d-grid'>
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>
                        <div className='mt-2 text-center border-top pt-2 mt-3'>
                            <Link to="/register" className='text-decoration-none btn btn2 mt-2 ' > Create New Account</Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login