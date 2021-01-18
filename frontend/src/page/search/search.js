import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import {getAll, getTag} from '../../axios'
const tags = {
    hot: '熱門',
    current: '近期刊登',
    highPayment: '高報酬',
    urgent: '緊急任務',
    all: '所有'
}
var posts = []
function Search(props) {
    console.log('Search props:',props)
    console.log('Search props.location.pathname:',props.location.pathname)
    let NTUID = window.localStorage.getItem('NTUID')
    let paths = props.location.pathname.split('/')
    let tag = paths[paths.length - 1]
    useEffect(()=>{
        if(tag==='all'){
            posts = getAll(NTUID)
        }else{
            posts = getTag(tag)
        }
    },[])
    
    return(
        <>
            <h1>
                {tags[tag]}            
            </h1>
            <br></br>
            <h2>-的需求單搜尋結果</h2>
            {/* 搬一個PostTable過來 */}
        </>
    )
}

export default Search
