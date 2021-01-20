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

    console.log('Search props:',props)
    let paths = props.location.pathname.split('/')
    let tag = paths[paths.length - 1]

    function handleModalOpen (i) {
        // alert(i.target.id);
        console.log("activeIndex", i.target.id);
        setActiveIndex(i.target.id);
        setDetailsVisible(true);
    }

    // async function refreshPostTable(){
    //     if(tag==='all'){
    //         let res = await getAll(NTUID)
    //         if(res.length > 0){
    //             res.forEach(function(item, i) {
    //                 var titleText = item.title
    //                 item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
    //             });
    //         }
    //         setPostdata(res);
    //         // setPostdata(await getAll(NTUID))//重要!!set state是async function
    //     }else{
    //         let res = await getTag({tag:tag,NTUID:NTUID})
    //         if(res.length > 0){
    //             res.forEach(function(item, i) {
    //                 var titleText = item.title
    //                 item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
    //             });
    //         }
    //         setPostdata(res);
    //         // setPostdata(await getTag({tag:tag,NTUID:NTUID}))
    //     }
    //     console.log('after set search:',postdata)
    // }
    async function refreshSupply(){
        setSupplydata(await getUserSupplies(NTUID))
    }
  
    useEffect(async ()=>{ 
        setSupplydata(await getUserSupplies(NTUID))//async function
    },[])

    const refreshPostTable = async ()=>{
        console.log('refreshPostTable...')
        if(tag==='all'){
            let res = await getAll(NTUID)
            if(res.length > 0){
                res.forEach(function(item, i) {
                    var titleText = item.title
                    item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
                });
            }
            console.log('test refreshPostTable:',res)
            setPostdata(res);
            // setPostdata(await getAll(NTUID))//重要!!set state是async function
        }else{
            let res = await getTag({tag:tag,NTUID:NTUID})
            if(res.length > 0){
                res.forEach(function(item, i) {
                    var titleText = item.title
                    item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
                });
            }
            setPostdata(res);
            // setPostdata(await getTag({tag:tag,NTUID:NTUID}))
        }
        console.log('after set search:',postdata)
    }

    useEffect(refreshPostTable,[supplydata])


    useEffect(()=>{
        console.log('search postdata updated:',postdata)
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
   
            {/* 搬一個PostTable過來 */}
            <PostTable editable={false} postdata={postdata}/>
            <DemandDetail detailsVisible={detailsVisible} item = {postdata[activeIndex]} onChange={setDetailsVisible}></DemandDetail>  
        </>
    )
}

export default Search
