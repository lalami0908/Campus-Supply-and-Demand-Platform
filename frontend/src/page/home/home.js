import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import { Component } from 'react';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"

function Home() {

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

    return(
        <div>
            <div>
                <button onClick={ openPopupbox }>新增需求單</button>
                <PopupboxContainer />
            </div>
            <h1>
                Home TEST            
            </h1>
        </div>
    )
}

export default Home
