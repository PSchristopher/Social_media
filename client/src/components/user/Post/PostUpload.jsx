import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../../Context/Context'
import myPic from '../../../assets/myPic.jpg'
import axios from '../../../Axios/axios'
import jwtdecode from "jwt-decode"
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


function PostUpload() {

  const inputRef = useRef()
  const triggerFileSelectPopup = () => inputRef.current.click()

  const { ShowPostModal, setShowPostModal } = useContext(AppContext)
  const [Image, setImage] = useState('')
  const [post, setPost] = useState({
    User: '', Caption: '',
    image: ''
  })
  const handleChange = (e) => {
    console.log("handlechange ann");
    const { name, value } = e.target
    setPost({
      ...post,
      [name]: value,
    })
    console.log(post);
  }
  const fileUpload = (e) => {
    let userDetails = jwtdecode(localStorage.getItem("Usertoken"))
    console.log(userDetails);
    console.log("file upload ann");
    setImage(URL.createObjectURL(e.target.files[0]))
    setPost({
      ...post,
      image: e.target.files[0],
      User: userDetails.id
    })

  }
  const upload = () => {
    console.log(post, "upload cheyyan povann");
    if (post.image == '') {
      console.log("poyilla")
    } else {
      const formData = new FormData()
      for (let key in post) {
        formData.append(key, post[key])
      }
      console.log("post");
      console.log(post);
      console.log("formData");
      console.log(formData);
      axios.post('/newPost', formData, {
        headers: {
          "x-access-token": localStorage.getItem("Usertoken"),
        },
      }).then((response) => {
        if (response.data.status) {
          setShowPostModal(false)
          console.log("post added successfully");
        } else {
          setShowPostModal(false)
          console.log("something went wrong");
        }
      })

    }
  }
  return (
    <div>

      {ShowPostModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full  my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <div className='flex bg-transparent rounded-full w-full'>
                    <img src={myPic} alt="" className='h-16 w-16 rounded-full object-cover border-[3px]' />
                    {/* <input type="text" /> */}
                    <textarea name="Caption" id="" className='w-full p-3' onChange={handleChange} placeholder="Enter ur Caption" ></textarea>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowPostModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex h-[450px] bg-cover border-8  justify-center " style={{ backgroundImage: `url(${Image || 'https://imgs.search.brave.com/wyOMuJf8rNvTW5WUJoisK3bd0u7QBG5182Ov5vPpFbw/rs:fit:1000:667:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/ODUyODg3MzQ3NTYt/MGIzMWEwYTMxZDk1/P2l4bGliPXJiLTEu/Mi4xJml4aWQ9ZXlK/aGNIQmZhV1FpT2pF/eU1EZDkmdz0xMDAw/JnE9ODA'})` }}>
                  <div className='flex justify-center items-center '>
                    <input type="file" title='' name='image' accept='.jpg' className='w-[100px]' ref={inputRef} style={{ color: `transparent`, display: 'none' }} onChange={fileUpload} required />
                    <button className='w-[100px] bg-[#0F213E] text-white rounded-lg text-lg' onClick={triggerFileSelectPopup}>Choose</button>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-3  border-solid bg-black border-slate-200 border-4 border-t-4 rounded-b-lg">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowPostModal(false)}
                  >
                    Close
                  </button> */}
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowPostModal(false)}
                  >
                    Save Changes
                  </button> */}

                  <button
                    className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"

                    onClick={upload} >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>


  )
}

export default PostUpload