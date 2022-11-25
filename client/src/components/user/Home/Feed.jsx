import React, { useContext, useEffect, useState } from 'react'
import myPic from '../../../assets/myPic.jpg'
import { BsFillHeartFill, BsFillShareFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import axios from '../../../Axios/axios'
import { format, render, cancel, register } from 'timeago.js';
import jwtdecode from "jwt-decode"




function Feed() {

    let userDetails = localStorage.getItem("Usertoken") ? jwtdecode(localStorage.getItem("Usertoken")) : ''


    const [feed, setFeed] = useState([])
    const [CommentSection, setCommentSection] = useState({ status: false, postId: '' })
    const [Comment, setComment] = useState({ postId: '', Comment: "", userId: '' })
    const [ViewAllComment, setViewAllComment] = useState([])
    const [dropdownOpen, setdropdownOpen] = useState(false);

    useEffect(() => {
        getPost()
    }, [])
    const getPost = () => {
        axios.get('/getPost').then((response) => {

            if (response.data.result) {
                console.log(response.data.feed);
                setFeed(response.data.feed)

            } else {
                console.log("something went wrong");
            }
        })
    }

    const likes = (postID) => {
        let data = {
            postid: postID,
            userId: userDetails.id
        }
        axios.post('/likes', data).then((response) => {
            // console.log(response);
            getPost()
        })
    }

    const showComments = (postID) => {
        console.log('mj');
        axios.get(`/getComments?postId=${postID}`).then((response) => {
            console.log(response.data);
            setViewAllComment(response.data.Comments)
        })
    }

    const showComment = (postID) => {
        console.log('mj');
        showComments(postID)
        setCommentSection({
            status: !CommentSection.status,
            postId: postID
        })
    }
    const handleChange = (e, postId) => {

        console.log(postId);
        console.log(e.target.value);
        setComment({
            ...Comment,
            postId: postId,
            Comment: e.target.value,
            userId: userDetails.id
        })

    }
    const postComment = () => {

        axios.post('/postComment', Comment).then((response) => {
            console.log(response);
            showComments(Comment.postId)
            setComment({
                ...Comment,
                postId: '',
                Comment: '',
                userId: ''
            })

        })
    }
    return (
        < >
            <div className=' overflow-y-scroll h-[70vh] overflow-hidden scrollbar-hide'>

                {
                    feed.map((post, index) => {
                        return (
                            <div className='bg-[#1f354d] p-2 rounded-lg shadow-light w-full mb-4 max-w-[40rem]' >
                                <div className="flex justify-between">
                                    <div className='flex my-3 pb-3 '>
                                        <div>
                                            <div className='rounded-full  relative w-[50px] h-[50px]'>
                                                {
                                                    post.userId.image ?
                                                        <img src={`/images/${post.userId.image}`} className='rounded-full object-cover w-full h-full ' alt="" />
                                                        :
                                                        <img src={'https://randomuser.me/api/portraits/lego/0.jpg'} alt="ProfileImage" className="rounded-full object-cover w-full h-full " />
                                                }

                                            </div>
                                        </div>
                                        <div className='ml-6 '>
                                            <h2 className='text-[14px] font-semibold text-white'>{post.userId.UserName}</h2>
                                            <p className='text-[10px] text-slate-300'>{format(post.Created)}</p>
                                        </div>
                                        <div className='ml-2 p-1'>
                                            <p className='text-[12px] text-slate-300'>{post.userId.email}</p>

                                        </div>

                                    </div>
                                    {/* <div className=' flex'> */}
                                    {/* <button className='justify-end text-white' ><BsThreeDotsVertical/></button> */}

                                    {/* </div> */}
                                    <button
                                        onClick={() => {
                                            console.log("clicked");
                                            setdropdownOpen(true)}}
                                        className="overflow-hidden rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer  text-white hover:bg-white hover:text-black">
                                        <BsThreeDotsVertical />
                                    </button>


                                    <div
                                        className={`${dropdownOpen ? `top-full opacity-100 visible bg-white` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}>
                                        <a
                                            className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary"
                                        >
                                            Edit
                                        </a>
                                        
                                    </div>
                                </div>
                                <div className='object-contain '>
                                    <img src={`/images/${post.image}`} alt="" className='rounded-lg object-cover w-full  h-[500px] border-4 border-spacing-3 border-[#50809b]' />
                                </div>
                                <div className='p-2 max-w-[40rem]'>
                                    <p className='text-[#A0ADB4]  text-base	truncate'>{post.description}</p>
                                </div>
                                <div className='flex gap-3 p-3'>
                                    <div className='flex'>

                                        <button className='bg-[#274055] rounded-lg text-white p-1 flex gap-1 items-center' onClick={() => likes(post._id)}> <p className=''>{post.Likes.length}</p> <BsFillHeartFill className={` ${post.Likes.includes(userDetails.id) ? " text-red-600" : "text-white"}  `} /></button>
                                    </div>
                                    <button className='bg-[#274055] rounded-lg text-white p-1 ' onClick={() => showComment(post._id)}><FaRegCommentDots className={` flex  text-white  items-center 
                                     `} /></button>
                                    <button className='bg-[#274055] rounded-lg text-white p-1 '><BsFillShareFill className='flex text-white  items-center' /></button>
                                </div>
                                {
                                    CommentSection.status && CommentSection.postId == post._id ?
                                        <div className=' '>
                                            <div className='max-h-[12rem] overflow-y-scroll scrollbar-hide'>
                                                {
                                                    ViewAllComment.map((comment, index) => {
                                                        return (
                                                            <div className='flex mb-3 '>
                                                                <div className='flex rounded-full  min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px]'>
                                                                    <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />

                                                                </div>
                                                                <div className='ml-5  gap-3 items-center'>
                                                                    <h2 className='text-[14px] font-semibold text-white'>{comment.userId.UserName}  	&nbsp; <span className='text-[10px] text-gray-400'>{format(comment.created)}</span></h2>
                                                                    <span className='text-[13px] text-gray-400'>{comment.Comment}</span>
                                                                </div>
                                                            </div>


                                                        )
                                                    })
                                                }
                                            </div>



                                            <div className='flex w-full '>
                                                <div className=' rounded-full  w-[50px] h-[50px] z-20'>
                                                    <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                                                    {/* <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div> */}

                                                </div>
                                                <div className='flex w-full border-2 gap-2 rounded-lg border-gray-400 ml-[-25px] '>
                                                    <input name="Caption" id="" className='w-full h-10 p-3 bg-transparent pl-8' value={Comment.Comment} onChange={(e) => handleChange(e, post._id)} />
                                                    {
                                                        Comment.Comment != '' ?
                                                            <button className=' text-white pr-2 hover:text-gray-500 ' onClick={postComment}  >Post</button>
                                                            : null
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                        : null


                                }

                            </div>
                        )
                    })



                }
            </div>
        </>
    )
}

export default Feed