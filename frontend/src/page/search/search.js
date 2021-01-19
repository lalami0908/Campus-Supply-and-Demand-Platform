import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import {getAll, getTag} from '../../axios'
import SupplyModal from '../../component/SupplyModal'
import PostTable  from '../../component/postTable';
const tags = {
    hot: '熱門',
    current: '近期刊登',
    highPayment: '高報酬',
    urgent: '緊急任務',
    all: '所有'
}

function Search(props) {
    const [postdata, setPostdata] = useState([])
    console.log('Search props:',props)
    const NTUID = window.localStorage.getItem('NTUID')
    let paths = props.location.pathname.split('/')
    let tag = paths[paths.length - 1]
    useEffect(async()=>{
        if(tag==='all'){
            setPostdata(await getAll(NTUID))//重要!!set state是async function
        }else{
            setPostdata(await getTag({tag:tag,NTUID:NTUID}))
        }
        console.log('after set search:',postdata)
    },[])

    useEffect(()=>{
        console.log('search postdata updated:',postdata)
        if(postdata.length>0 && postdata[0].apply === undefined){
            setPostdata(postdata.map(row=>{
                return {apply: <SupplyModal postID={row._id} NTUID={NTUID}/>,...row}
            }))
        }

    },[postdata])

    return(
        <>
            <h1 style={{
                fontSize: '5vh'
            }}>
                {tags[tag]}            
            </h1>
            <h2>-的需求單搜尋結果</h2>
            {/* 搬一個PostTable過來 */}
            <PostTable editable={false} postdata={postdata}/>
        </>
    )
}

export default Search
