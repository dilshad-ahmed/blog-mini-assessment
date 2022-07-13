import React, { useState, useEffect } from 'react';
import '../Login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { createBlog, resetError } from '../../features/blog/createBlogSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

const CreateBlog = () => {

    const [inputs, setInputs] = useState({});

    const dispatch = useDispatch()
    const { loading, blog, isCreated, error } = useSelector((state) => state.createdBlog)
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
        dispatch(createBlog(inputs));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetError())

        }
        if (isCreated) {
            navigate("/")
            dispatch(resetError())
        }
    }, [dispatch, isCreated, error])

    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="reg-container create-blog">
                    <div className='modal-size-reg'>
                        <div>
                            <h5 className='text-center mb-3 text-muted  '>Create New Blog</h5>
                        </div>
                        <form onSubmit={handleSubmit} encType="application/json">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input value={inputs.title} onChange={handleChange} type="text" className="form-control form-control-modify" name="title" placeholder=' ' id='c1' autoComplete="off" autoFocus required />
                                        <label htmlFor="c1" className="input-text"> Title</label>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group">
                                <textarea value={inputs.description} onChange={handleChange} rows="5" type="text" className="form-control form-control-modify" name="description" placeholder=' Description' autoComplete="off" required />
                                {/* <label className="input-text">Description</label> */}
                            </div>

                            <div className='d-flex justify-content-center'>
                                <button type='submit' className='btn btn2 '> Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBlog