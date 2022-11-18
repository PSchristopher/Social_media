import React, { useContext } from 'react'
import PostUpload from '../../../components/user/Post/PostUpload'
import { AppContext } from '../../../Context/Context'

function Post() {
  const {ShowPostModal, setShowPostModal} = useContext(AppContext)

    return (
        <>
            <PostUpload />
        </>
    )
}

export default Post