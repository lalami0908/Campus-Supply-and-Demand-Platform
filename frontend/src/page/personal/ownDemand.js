import React, { useEffect, useRef, useState } from 'react'
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';

import { getUserPost } from '../../axios'
import { Button } from 'antd';
// import getUserPost from '../../axios/post.js';


function OwnDemand() {
    const [postdata, setPostdata] = useState([])
    const NTUID = window.localStorage.getItem('NTUID')

    
    async function queryPost(){
        let res = await getUserPost(NTUID);
        console.log(res);
        setPostdata(res);
    };
    queryPost();
    // useEffect(()=>{
    //     let resdata = getUserPost(NTUID)//async function
    //     setPostdata(resdata)
    // })

    return(
        <div>
            <h1>
            OwnDemand TEST            
            </h1>
            <Button onClick={queryPost}>重新整理</Button>
            {/* <UploadImage></UploadImage> */}
            <CreateNewPostForm handleAddNewPostAndRefreshTable={queryPost}></CreateNewPostForm>
            <PostTable editable={true} postdata={postdata}/>
 
        </div>
       
    )
}

export default OwnDemand