import React, { useState , useEffect} from 'react';
import { Button, Modal, Form, Input } from 'antd';

const { confirm } = Modal;

const DemandDetail =  (props)=> {
    const [visible, setVisible] = useState(false)
    const [newMsg, setNewMsg] = useState("")

    useEffect(()=>{
        setVisible(props.detailsVisible)
        console.log("useEffect", `${props.item}`);
    },[props.detailsVisible])
    
    useEffect(()=>{
      if(!visible){
        props.onChange(visible)
      }
    },[visible])
    
    const handleOk = () => {
        setVisible(false);
        // props.onSubmit()
    };
    
    const handleCancel = () => {
        confirm({
            title: '確定要取消需求嗎',
            content: '',
            okText: '確定取消',
            okType: 'danger',
            cancelText: '不要取消',
            onOk() {
              console.log('OK');
              setVisible(false)
            },
            onCancel() {
              console.log('Cancel');
              setVisible(false)
            },
          });
       
    };
        
    const handleMsgSubmit = (msg) => {
        console.log("handleMsgSubmit", newMsg);

    };
    const handleMsgChange = (msg) => {
        setNewMsg(msg.target.innerHTML);
    };
    

    return (
        <div className="DemandDetail">
            {/* cancelButtonProps={{ style: { display: 'none' } }} */}
            <Modal class="DemandDetail" onCancel={handleCancel} onOk={handleOk} visible={visible} title="詳細情報" okText="確認" cancelText="取消">
                {(props.item)?(
                <div>
                    <p>{`需求標題: ${props.item.title.props.children[1]}`}</p>
                    <p>{`需求內容: ${props.item.content}`}</p>
                    <p>{`報酬金額: ${props.item.price}`}</p>
                    <p>{`刊登時間: ${props.item.postDate}`}</p>
                    <p>{`截止時間: ${props.item.deadline}`}</p>
                    
                    {(props.item.imgPath)?
                    (props.item.imgPath.map((item) => { return <img src={item} style={{width: "50%", height: "100%"}}/>}))
                        :(<p>no picture</p>)}

                    {(props.item.message)?
                    (props.item.message.map((item) => { return <p>{ item }</p>}))
                        :(<p>尚未有人留言</p>)}  
                    {/* <form onSubmit={handleMsgSubmit}>
                        <label>
                        輸入留言:
                        <input type="textarea" onChange={handleMsgChange} />
                        </label>
                        <input type="submit" value="送出" />
                    </form> */}

                    <Input.TextArea onChange={handleMsgChange}></Input.TextArea>
                    <Button onClick={handleMsgSubmit}>送出留言</Button>                    
                
                </div>
                
                ):(<p>取得需求單資訊錯誤，請重新整理</p>)}

            </Modal>
        </div>
    );
  };

  export default DemandDetail;