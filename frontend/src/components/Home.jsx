import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blog/BlogSlice';
import BlogCard from './BlogCard';
import { likeBlog, resetError, resetLiked } from '../features/blog/likeSlice';
import { toast } from 'react-toastify';



const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, blogs, error } = useSelector((state) => state.blogs);
    const { isAuthenticated } = useSelector((state) => state.login)
    const { loading: likeLoading, isLiked, message, error: likeError } = useSelector((state) => state.liked)


    // Handling the Likes
    const handleLikes = (id) => {
        if (isAuthenticated) {
            dispatch(likeBlog(id));
        } else {
            navigate('/login');
        }
    }


    useEffect(() => {
        if (isLiked) {
            toast.success(message)
            dispatch(resetLiked());
        }
        if (likeError) {
            toast.error(likeError)
            dispatch(resetError());
        }

        dispatch(getBlogs());
    }, [dispatch, isLiked, likeError, resetError])

    return (
        <>
            <section className="container py-5 ">
                <div className="row gy-3">
                    {blogs && blogs.length > 0 &&
                        blogs.slice(0).reverse().map((item, i) => (
                            <BlogCard key={i} item={item} handleLikes={handleLikes} />
                        ))
                    }

                </div>
            </section>
        </>
    )
}

export default Home