import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
const tags = {
    hot: '熱門',
    current: '近期刊登',
    highPayment: '高報酬',
    urgent: '緊急任務',
    all: '所有'
}
function Search(props) {
    console.log('Search props:',props)
    console.log('Search props.location.pathname:',props.location.pathname)
    let paths = props.location.pathname.split('/')
     
    return(
        <>
            <h1>
                {tags[paths[paths.length - 1]]}            
            </h1>
            <br></br>
            <h2>-的需求單搜尋結果</h2>
        </>
    )
}

export default Search
