import React, { useEffect, useRef, useState } from 'react'
// import {Card, Button, Input, message,Layout, Menu, Icon, Modal } from 'antd'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

    const useStyles = makeStyles({
      root: {
        height: 500,
        maxWidth: 600,
      },
    });
    const classes = useStyles();

    return(
      <div>
         <br></br>
        {/* <Card className='personal'>
          <div className='personal-header'>
            <h1 className='personal-name'>
              {`${name}的個人資訊`}
            </h1>
          </div>
          <div className='personal-main'>
            <div className='personal-photo'>
              <img src={info.imgPath} style={{width: "50%", height: "100%"}}></img>
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
        </Card> */}

      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            image={info.imgPath}
            title="Contemplative Reptile"
            height="200"
            width="400"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {`${name} 的個人資訊`}
            </Typography>
      
            <Typography variant="body2" color="textSecondary" component="p">
              {`自我介紹： ${info.introduction}`}
            </Typography>
          
            <Typography variant="body2" color="textSecondary" component="p">
              {`擅長什麼： ${info.expertise}`}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {`主要需求： ${info.demands}`}
            </Typography>
            <br></br>
            <EditPersonalInfoForm refreshTable={refreshTable}/>
          </CardContent>
        </CardActionArea>
    </Card>
    </div>
    )

}

export default Personal
