import React, { useEffect, useRef, useState } from 'react'
import {Card, Button, Input, message,Layout, Menu, Icon, Modal } from 'antd'
import "react-popupbox/dist/react-popupbox.css"
import {getPersonalInfo, setPersonalInfo} from '../../axios'
import {BASE_URL} from '../../common/APIpath'
import './personal.scss'
import EditPersonalInfoForm from '../../component/EditPersonalInfoForm'
function Personal(props) {
    const [info, setInfo] = useState({
      imgPath:`${BASE_URL}public/uploads/0.jpg`,
      introduction:'說點關於自己的事吧說點關於自己的事吧說點關於自己的事吧說點關於自己的事吧說點關於自己的事吧說點關於自己的事吧說點關於自己的事吧',
      expertise:'擅長什麼呢',
      demands:  '有什麼大家能幫你的嗎'
    })

  
    async function refreshTable(getInfo){
      console.log("getInfo", getInfo);
      var newInfo = {
        imgPath: getInfo.personalInfo.imgPath,
        introduction: getInfo.personalInfo.introduction,
        expertise: getInfo.personalInfo.expertise,
        demands: getInfo.personalInfo.demands
      }
      setInfo(newInfo);
    }

    const name = localStorage.getItem('name')
    useEffect(async()=>{
      let res = await getPersonalInfo(name)
      if(res){
        setInfo(res)
      }
      
    },[])
    useEffect(()=>{
      console.log('get info:',info)
    },[info])

    return(
        <Card className='personal'>
          <div className='personal-header'>
            <h1 className='personal-name'>
              {`${name}的個人資訊`}
            </h1>
          </div>
          <div className='personal-main'>
            <div className='personal-photo'>
              <img src={info.imgPath}></img>
            </div>
            <section className='personal-intro'>
              {info.introduction}
            </section>
          </div>
          <section className='personal-footer'>
            <Card className='personal-expert'>
              {info.expertise}
            </Card>
            <Card className='personal-demand'>
              {info.demands}
            </Card>
          </section>
          <EditPersonalInfoForm refreshTable={refreshTable}/>
        </Card>
    )

}

export default Personal
