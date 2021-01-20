import React, { useEffect, useRef, useState } from 'react'
import PostTable  from '../../component/postTable.js';
import CreateNewPostForm  from '../../component/creatNewPostForm.js';
import DemandDetail from '../../component/DemandDetail.js'
import { getUserPost } from '../../axios'
import { Button } from 'antd';

function OwnDemand() {
    const NTUID = window.localStorage.getItem('NTUID')
    const [postdata, setPostdata] = useState([])

    const [detailsVisible, setDetailsVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    function handleModalOpen (i) {
        // alert(i.target.id);
        console.log("i", i);
        console.log("activeIndex", i.target.id);
        setActiveIndex(i.target.id);
        setDetailsVisible(true);
    }
    
    // 不確定能不能抽層（？）

    // 取得所有 post 跟 message
    useEffect(async ()=>{
        let res = await getUserPost(NTUID)//async function
        if(res.length > 0){
            res.forEach(function(item, i) {
                var titleText = item.title
                item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
            });
        }
        console.log("setPostdata", res);
        setPostdata(res)

        
    }, [])

    // 讓新增需求單也能刷新 table (取得所有 post 跟 message)
    async function refreshTable(){
        let res = await getUserPost(NTUID);
        if(res.length > 0){
            res.forEach(function(item, i) {
                var titleText = item.title
                item['title'] = <a onClick={ handleModalOpen} className="nav-link"  id={i} > { titleText } </a>
            });
        }
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
            <DemandDetail canCancelDemand={true} detailsVisible={detailsVisible} item = {postdata[activeIndex]} onChange={setDetailsVisible}></DemandDetail>  
        </div>     
    )
}

export default OwnDemand