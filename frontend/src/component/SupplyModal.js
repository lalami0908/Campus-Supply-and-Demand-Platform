import React, { useState , useEffect} from 'react';
import { Button, Modal } from 'antd';
import  {supply} from '../axios'

//接單確認
const SupplyModal = function (props) {
    const [visible, setVisible] = useState(false)
    const NTUID = window.localStorage.getItem('NTUID')
    const name = window.localStorage.getItem('name')
    useEffect(()=>{
        console.log('SupplyModal item:',props)
    },[])
  
    const showModal = () => {
        console.log('contract!')
        setVisible(true)
    };
    const handleOk = async() => {
        setVisible(false);

        let feedback = await supply({NTUID:NTUID,name:name,postID:props.postID})
        console.log('supply feedback:',feedback)
        alert(feedback.msg)
        await props.onSupply()        
    };
    const handleCancel = () => {
        setVisible(false)
    };
  
    return (
        <>
            <Button type="primary" onClick={showModal}>
                交給我了!
            </Button>
            <Modal onCancel={handleCancel} onOk={handleOk} visible={visible} title="最後確認" okText="成交!" cancelText="算了QQ">
                <p>就決定幫他嗎</p>
            </Modal>
        </>
    )
}
export default SupplyModal