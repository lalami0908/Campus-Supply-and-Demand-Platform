import React, { useEffect, useRef, useState } from 'react'
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';
import DemandDetail from '../../component/DemandDetail.js'
import { getUserPost } from '../../axios'
import { Button } from 'antd';
// import getUserPost from '../../axios/post.js';

function OwnDemand() {
    const [postdata, setPostdata] = useState([])
    const NTUID = window.localStorage.getItem('NTUID')
    const [detailsVisible, setDetailsVisible] = useState(true)

    function handleModalOpen () {

        setDetailsVisible(true);
        alert("open");
    }

    useEffect(async ()=>{
        let resdata = await getUserPost(NTUID)//async function
        if(resdata.length > 0){
            resdata.forEach(function(item, i) {
                resdata.title = <a onClick={ handleModalOpen } className="nav-link">123</a>;
            });
        }


        setPostdata(resdata)
    }, [])

    // 讓新增需求單也能刷新 table
    async function refreshTable(){
        let res = await getUserPost(NTUID);
        if(res.length > 0){
            res.forEach(function(item, i) {
                var titleText = item.title
                item['title'] = <a onClick={ handleModalOpen} className="nav-link">  
                    <DemandDetail detailsVisible={detailsVisible} item = {item} onChange={setDetailsVisible}></DemandDetail>  
                    { titleText }   
                    </a>
                   
              
            });
        }

        console.log("refreshTable: ", res);
        setPostdata(res)
    }

   


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