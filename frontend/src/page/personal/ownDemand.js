import React, { useEffect, useRef, useState } from 'react'
// import { Button, Input, message, Tag } from 'antd'
// import MaterialTable from 'material-table';
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';
// import FormModal from '../../component/FormModal.js';
import  UploadImage   from '../../component/UploadImage.js';
import getUserPost from '../../axios'
function OwnDemand() {
    const [postdata, setPostdata] = useState([])
    const NTUID = window.localStorage.getItem('NTUID')
    // useEffect(()=>{
    //     let resdata = getUserPost(NTUID)//async function
    //     setPostdata(resdata)
    // })

    return(
        <div>
            <h1>
            OwnDemand TEST            
            </h1>
            {/* <UploadImage></UploadImage> */}
            <CreateNewPostForm></CreateNewPostForm>
            <PostTable editable={true} postdata={postdata}/>
 
        </div>
       
    )
}

export default OwnDemand
