import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag ,Layout, Menu, Icon, Modal } from 'antd'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"



function Personal(props) {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000); // 兩秒後關閉視窗
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };


    console.log('test Personal')
    const saveDemand = () =>  {
        // 要打後端
        PopupboxManager.close()
    }
    const openPopupbox = () =>  {
        const content = (
          <div>
            <span>需求單參數</span>
            <button onClick={ saveDemand }>新增</button>
          </div>
        )
  
        PopupboxManager.open({
          content,
          config: {
            titleBar: {
              enable: true,
              text: '新增需求單'
            },
            fadeIn: true,
            fadeInSpeed: 500
          }
        })
      }



    function onSubmit () {

    } 


    return(
        <div>
          <Button type="primary" onClick={showModal}>
            新增需求單
          </Button>
          <Modal
            title="建立屬於你自己的需求"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            
          <p>Form</p>
          </Modal>


            <div>
                <button onClick={ openPopupbox }>新增需求單</button>
                <PopupboxContainer />
            </div>
            <h1>
                Personal TEST            
            </h1>
        </div>
    )

}

export default Personal
