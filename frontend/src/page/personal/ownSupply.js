import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import SupplyTable  from '../../component/supplyTable.js';
import DemandDetail from '../../component/DemandDetail.js'
import { getUserSupplies, getIdPosts } from '../../axios'
function OwnSupply() {
    const [postdata, setPostdata] = useState([])
    const [supplydata, setSupplydata] = useState([])
    const NTUID = window.localStorage.getItem('NTUID')


    const [detailsVisible, setDetailsVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    function handleModalOpen (i) {
        setActiveIndex(i.target.id);
        setDetailsVisible(true);
    }

    useEffect(async ()=>{
        setSupplydata(await getUserSupplies(NTUID))//async function
    }, [])

    // 讓刪除供給單也能刷新 table 
    async function refreshTable(){
        setSupplydata(await getUserSupplies(NTUID));
    }

  

    useEffect( async ()=>{
        if(supplydata!==undefined){
            let demandIds = supplydata.map(supply=>supply.demandId)
            // console.log('debug demandIds:',demandIds)
            let res = await getIdPosts(demandIds);
            if(res.length > 0){
                res.forEach(function(item, i) {
                    var titleText = item.title
                    item['title'] = <a onClick={ handleModalOpen} className="nav-link" id={i} > { titleText } </a>         
                });
            }
            // console.log("setPostdata", res);
            setPostdata(res)
               
        }

    },[supplydata])

    useEffect(()=>{
        // console.log('modify postdata:',postdata)
    },[postdata])    

    return(
        <div>

        <h1>
            感謝你接下了這些需求，全台大學生的生活都靠你了            
        </h1>
        <SupplyTable  refreshTable= {refreshTable} 
                    editable={true} 
                    postdata={postdata}/>
        <DemandDetail  detailsVisible={detailsVisible} 
                item = {postdata[activeIndex]} 
                onChange={setDetailsVisible}
            
        ></DemandDetail>  
        </div>
    )
}

export default OwnSupply
