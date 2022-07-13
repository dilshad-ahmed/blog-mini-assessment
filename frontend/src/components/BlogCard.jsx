import React, { useEffect, useState } from 'react'


const BlogCard = ({ item, handleLikes }) => {

    const [newTime, setNewTime] = useState('');
    const [postDate, setPostDate] = useState('');
    const [postMonth, setPostMonth] = useState('');


    useEffect(() => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dateObj = new Date(item.createdAt);
        // console.log(nDate.toLocaleTimeString());
        setPostMonth(months[dateObj.getMonth()]);
        setPostDate(dateObj.getDate());
        setNewTime(dateObj.toLocaleTimeString());

    }, [item])

    return (
        <>
            <div className="col-md-6 col-sm-6 col-lg-4">
                <div className='card blog-card bg-white p-3 text-justify'>
                    <div>
                        <h4 className="title"> {item && item.title} </h4>
                        <p>{item && item.description}</p>
                    </div>


                    <div className="card-bottom">
                        <div className='col-12 text-black-50 px-3 pb-2 small'>
                            <i class="fa fa-clock-o me-1"></i>{item && `${postDate},${postMonth} ${newTime}`}
                        </div>
                        <div className="row  d-flex justify-content-center align-items-center">
                            <div className="col-6 d-flex justify-content-center align-items-center">

                                <>
                                    <button onClick={() => handleLikes(item && item._id)} className="icon-btn">
                                        <i className="fa fa-heart-o"></i>
                                        {/* <i className="fa fa-heart"></i> */}
                                    </button>
                                    <span className='ms-1'>{item && item.likes.length} Likes</span>
                                </>

                            </div>

                            <div className="col-6 d-flex justify-content-center">
                                <button className="border-0 px-2 py-2 rounded-pill view-more-btn">
                                    {/* <div className=''> */}
                                    by {item && item.createdBy && item.createdBy.name}
                                    {/* </div> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard