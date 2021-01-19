import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import {getAll, getTag} from '../../axios'
import PostTable  from '../../component/postTable';
const tags = {
    hot: '熱門',
    current: '近期刊登',
    highPayment: '高報酬',
    urgent: '緊急任務',
    all: '所有'
}
var posts = []
function Search(props) {
    const [postdata, setPostdata] = useState([])
    console.log('Search props:',props)
    console.log('Search props.location.pathname:',props.location.pathname)
    const NTUID = window.localStorage.getItem('NTUID')
    let paths = props.location.pathname.split('/')
    let tag = paths[paths.length - 1]
    useEffect(async()=>{
        if(tag==='all'){
            setPostdata(await getAll(NTUID))
        }else{
            // setPostdata([])
            setPostdata(await getTag({tag:tag,NTUID:NTUID}))
        }
    },[])
    

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
