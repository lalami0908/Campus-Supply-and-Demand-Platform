import React, { useState , useEffect} from 'react';
import { Button, Modal, Form, Input } from 'antd';
import  { getMessage, addNewMessage } from '../axios'

const { confirm } = Modal;


/** 點下去看到的明細頁 應該叫 PostDetail */
const DemandDetail =  (props)=> {
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [messagedata, setMessagedata] = useState([])


    useEffect( async ()=>{
        console.log("useEffect1");
        setVisible(props.detailsVisible)
        console.log(visible);
 
        
    },[props.detailsVisible])
    
    useEffect(async ()=>{
        if(!visible){
            props.onChange(visible)
        }
        // 打開取回留言
        if(visible && props.item){
            let res = await getMessage(props.item._id) 
            if(res.success){
                setMessagedata(res.messages);
            }
            console.log("setMessagedata", messagedata);
        }
    },[visible])
    
    const handleOk = () => {
        setVisible(false);
        // props.onSubmit()
    };
    
    const handleCancelDemand = () => {
        confirm({
            title: '確定要取消需求嗎',
            content: '',
            okText: '確定取消',
            okType: 'danger',
            cancelText: '不要取消',
            onOk() {
                // TODO: 取消需求
              console.log('OK');
              setVisible(false)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
       
    };
    const handleCloseModal = () => {
        setVisible(false);
    };
        
    const handleMsgSubmit = async (msg) => {
        var newmessage = await addNewMessage(
            {
                demand_id: props.item._id,
                NTUID:  localStorage.getItem('NTUID'),
                name: localStorage.getItem('name'),
                content: inputValue,
            }
        );
        console.log("addNewMessageResult back data:", newmessage);
        // 前端顯示訊息
        // alert(newmessage.msg)
        if(newmessage.success){
            let res = await getMessage(props.item._id) 
            if(res.success){
                setMessagedata(res.messages);
                setInputValue("");
            }
            console.log("setMessagedata", messagedata);
        }
    };

    

    return (
        <div className="DemandDetail">
            {/* cancelButtonProps={{ style: { display: 'none' } }} */}
            <Modal class="DemandDetail" onCancel={handleCloseModal} onOk={handleOk} visible={visible} title="詳細情報" okText="確認" cancelButtonProps={{ style: { display: 'none' } }} >
                {(props.item)?(
                <div>
                    <p>{`需求單號: ${props.item._id}`}</p>
                    <p>{`需求標題: ${props.item.title.props.children[1]}`}</p>
                    <p>{`需求內容: ${props.item.content}`}</p>
                    <p>{`報酬金額: ${props.item.price}`}</p>
                    <p>{`刊登時間: ${props.item.postDate}`}</p>
                    <p>{`截止時間: ${props.item.deadline}`}</p>
                    
                    <h3>附圖：</h3>
                    {(props.item.imgPath)?
                    (props.item.imgPath.map((item) => { return <img src={item} style={{width: "50%", height: "100%"}}/>}))
                        :(<p>no picture</p>)}
                    
                    <h3>留言板：</h3>
                    {/* {(props.item.message)?
                    (props.item.message.map((item) => { return <p>{ item }</p>}))
                        :(<p>尚未有人留言</p>)}   */}
                    {(messagedata.length !=0 )?
                    (messagedata.map((item) => { 
                    // TODO: 應該要顯示name但message沒帶name
                        return <p>{ `${item.NTUID}: ${item.content}` } 
                        </p>}))
                        :(<p>尚未有人留言</p>)}  

                    <Input.TextArea  value={inputValue} onChange={(e) => setInputValue(e.target.value)}></Input.TextArea>
                    <Button onClick={handleMsgSubmit}>送出留言</Button>                    
                    {(props.canCancelDemand)?(<Button onClick={handleCancelDemand} type="danger">取消需求</Button>):(<></>)}
                </div>
                
                ):(<p>取得需求單資訊錯誤，請重新整理</p>)}


            </Modal>
        </div>
    );
  };

  export default DemandDetail;