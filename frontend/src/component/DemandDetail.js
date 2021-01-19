import React, { useState , useEffect} from 'react';
import { Button, Modal } from 'antd';
const DemandDetail =  (props)=> {
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
        setVisible(props.detailsVisible)
    },[props.detailsVisible])
    
    useEffect(()=>{
      if(!visible){
        props.onChange(visible)
      }
    },[visible])
    
    const handleOk = () => {
        setVisible(false);
        props.onSubmit()
    };
    
    const handleCancel = () => {
        setVisible(false)
    };
  
    return (
        <div className="DemandDetail">
            <Modal class="DemandDetail" onCancel={handleCancel} onOk={handleOk} visible={visible} title="詳細情報" okText="確認" cancelText="取消">
                <p>{`_id: ${props.item.postID}`}</p>
                <p>{`來自: ${props.item.name}`}</p>
                <p>{`回報$$: ${props.item.price}`}</p>
            </Modal>
        </div>
    );
  };

  export default DemandDetail;