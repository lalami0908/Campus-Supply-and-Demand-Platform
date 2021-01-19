import React, { useEffect, useRef, useState } from 'react'
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';

import { getUserPost } from '../../axios'
import { Button } from 'antd';
// import getUserPost from '../../axios/post.js';


async function queryPost(NTUID){
    let res = await getUserPost(NTUID);
    console.log(res);
    return res;
};



function OwnDemand() {
    const [postdata, setPostdata] = useState([])
    const NTUID = window.localStorage.getItem('NTUID')
    // let resdata = queryPost(NTUID) //async function
    // setPostdata(resdata)

    // useEffect(()=>{
    //     let resdata = getUserPost(NTUID)//async function
    //     setPostdata(resdata)
    // })

    async function refreshTable(){
        let res = await getUserPost(NTUID);
        console.log("refreshTable: ", res);
        setPostdata(res)

    }

    
    // async function queryPost(){
    //     let res = await getUserPost(NTUID);
    //     console.log(res);
    //     setPostdata(res);
    // };
   
    // useEffect( async ()=>{
    //     console.log("useEffect")
    //     let resdata = await getUserPost(NTUID)//async function
    //     console.log(resdata)
    //     setPostdata(resdata);
    // })

    return(
        <div>
            <h1>
            OwnDemand TEST            
            </h1>
            <Button onClick={refreshTable}>重新整理</Button>
            {/* <UploadImage></UploadImage> */}
            <CreateNewPostForm handleAddNewPostAndRefreshTable={refreshTable}></CreateNewPostForm>
            <PostTable editable={true} postdata={postdata}/>
 
        </div>
       
    )
}

export default OwnDemand