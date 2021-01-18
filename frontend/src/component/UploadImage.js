import React, { Component } from 'react'
import { Card, Upload, Icon, Modal,message } from 'antd'
import { BASE_URL, UPLOAD_IMAGE_ACTION, DELETE_IMAGE_ACTION } from '../common/APIpath';
// import { PlusOutlined } from '@ant-design/icons'



export default class UploadImage extends Component {
  state = {
    loading: false,
    imageUrl: '',
    fileList: [{ status: '', uid: 0, url: '',}]
  };

  // 保留必要屬性
  optimizeFileList = (data, fileList) => {
    const { name, url } = data
    const file = fileList.pop()
    const { uid } = file
    const newFile = { uid, name, url: `${BASE_URL}/${url}` }
    fileList.push(newFile)
  }
  
  handleChange = ({ file, fileList }) => {
    const { status, response } = file
    // 上傳成功
    if (status === 'done') {
      const { ok, message: msg, data } = response
      if (ok) {
        // this.optimizeFileList(data, fileList)
        
        // 调用 onChange 方法
        this.props.onChange(fileList)
        message.success(msg)
      } else {
        message.error(msg)
      }
    }
    this.setState({ fileList })
  }


  handleRemove = async file => {
    // 有 url -> 上傳到server了
    const { url } = file
    if (url) {
      const path = url.replace(`${BASE_URL}/`, '')
      const response = await fetch(DELETE_IMAGE_ACTION, {
        method: 'delete',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path })
      })
      const { ok, message: msg } = await response.json()
      if (ok) {
        message.success(msg)
      } else {
        message.error(msg)
        return false
      }
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
 
    return (
      <div className="UploadImage">
        <Upload 
          listType='picture-card'
          action={ UPLOAD_IMAGE_ACTION } 
          onChange={this.handleChange}
        >
        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} 
        </Upload>
      </div>
    )
  }
}

