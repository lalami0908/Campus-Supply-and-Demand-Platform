import React, { useEffect, useRef, useState } from 'react'
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';

import { getUserPost } from '../../axios'
import { Button } from 'antd';


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

    useEffect(async ()=>{
        let resdata = await getUserPost(NTUID)//async function
        setPostdata(resdata)
    }, [])

    async function refreshTable(){
        let res = await getUserPost(NTUID);
        console.log("refreshTable: ", res);
        setPostdata(res)

    }

    return(
        <div>
            <h1>
            你刊登了這些需求           
            </h1>
            <Button onClick={refreshTable}>重新整理</Button>
            {/* <UploadImage></UploadImage> */}
            <CreateNewPostForm handleAddNewPostAndRefreshTable={refreshTable}></CreateNewPostForm>
            <PostTable editable={true} postdata={postdata}/>
 
        </div>
       
    )
}

export default OwnDemand