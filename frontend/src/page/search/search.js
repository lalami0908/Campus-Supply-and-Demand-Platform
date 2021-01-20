import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import {getAll, getTag} from '../../axios'
import SupplyModal from '../../component/SupplyModal'
import PostTable  from '../../component/postTable';
import DemandDetail from '../../component/DemandDetail.js'
import { getUserSupplies, getIdPost } from '../../axios'
const tags = {
    hot: '熱門',
    current: '近期刊登',
    highPayment: '高報酬',
    urgent: '緊急任務',
    all: '所有'
}

function Search(props) {
    const NTUID = window.localStorage.getItem('NTUID')
    const [postdata, setPostdata] = useState([])
    const [supplydata, setSupplydata] = useState([])
    // 明細部分
    const [detailsVisible, setDetailsVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    let paths = props.location.pathname.split('/')
    let tag = paths[paths.length - 1]

    function handleModalOpen (i) {
        setActiveIndex(i.target.id);
        setDetailsVisible(true);
    }

  
    useEffect(async ()=>{ 
        setSupplydata(await getUserSupplies(NTUID))//async function
    },[])

    const refreshPostTable = async ()=>{
        if(tag==='all'||tag==='current' ){
            let res = await getAll(NTUID)
            if(res.length > 0){
                res.forEach(function(item, i) {
                    var titleText = item.title
                    item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
                });
            }

            if(tag==='current'){
                res = res.filter(post=>{
                    let now = new Date()
                    let time = parseInt(Math.abs(new Date(post.postDate)- now) / 1000 / 60 / 60)
                    return time < 24
                })
            }
            setPostdata(res);
        }else{
            let res = await getTag({tag:tag,NTUID:NTUID})
            if(res.length > 0){
                res.forEach(function(item, i) {
                    var titleText = item.title
                    item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
                });
            }
            setPostdata(res);
        }
    }

    useEffect(refreshPostTable,[supplydata])


    useEffect(()=>{
        if(postdata.length>0 && postdata[0].apply === undefined){
            setPostdata(postdata.map(row=>{
                return {apply: <SupplyModal postID={row._id} NTUID={NTUID} onSupply={refreshPostTable}/>,...row}
            }))
        }
    },[postdata])

    return(
        <>
            <h1 style={{
                fontSize: '5vh'
            }}>
                {`${tags[tag]} 的需求單搜尋結果`}            
            </h1>
   
            <PostTable editable={false} postdata={postdata}/>
            <DemandDetail detailsVisible={detailsVisible} item = {postdata[activeIndex]} onChange={setDetailsVisible}></DemandDetail>  
        </>
    )
}

export default Search
