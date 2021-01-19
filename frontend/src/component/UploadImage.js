import React, { Component } from 'react'
import { Card, Upload, Icon, Modal,message } from 'antd'
import { BASE_URL, UPLOAD_IMAGE_ACTION, DELETE_IMAGE_ACTION } from '../common/APIpath';
// import { PlusOutlined } from '@ant-design/icons'


// 限制檔案上傳
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export default class UploadImage extends Component {
  state = {
    loading: false,
    imageUrl: '',
    stateFileList: [],

    previewVisible: false,
    previewImage: '',
    previewImageName: ''
  };

  

  componentWillUnmount() {
    console.log("componentDidMount")
    this.setState({
      stateFileList: []
    })
  }

  // 顯示圖片
  showPreview = file => {
    // console.log("showFile",file)
    // console.log(this.props.isInit)
    // var path = ""
    // if(file.url){
    //   path = BASE_URL
    //   path+= file.response.data.url
    // } else {
    //   path = file.thumbUrl
    // }
   
    this.setState({
      previewVisible: true,
      previewImage: file.url,
      previewImageName: file.name
    })
  }

  // 隱藏查看圖片
  hidePreview = () => {
    this.setState({
      previewVisible: false
    })
  }


  
  // 保留必要屬性
  optimizeFileList = (data, fileList) => {
    const { name, url } = data
    const file = fileList.pop()
    const { uid } = file
    const newFile = { uid, name, url: `${BASE_URL}${url}` }
    fileList.push(newFile)

    
  }
  
  handleChange = ({ file, fileList }) => {
    // console.log("fileList",fileList)
    // console.log("state",this.state.stateFileList)
    const { status, response } = file
    // 上傳成功
    if (status === 'done') {
      const { ok, message: msg, data } = response
      if (ok) {
    
        this.optimizeFileList(data, fileList)
        
        // onChange 方法
        this.props.onChange(fileList)
      
        message.success(msg)
      } else {
        message.error(msg)
      }
    }
    //this.setState({ fileList })
    this.setState({
      stateFileList: fileList
    })
    // console.log(this.state.fileList)
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
        <div className="ant-upload-text">上傳</div>
      </div>
    );
    const { previewVisible, previewImage, previewImageName } = this.state
 
    return (
      <div className="UploadImage"  id="UploadImage">
        <Upload
          listType='picture-card'
          action={ UPLOAD_IMAGE_ACTION } 
          onChange={this.handleChange}
          beforeUpload={beforeUpload}
          onPreview={this.showPreview}
          // fileList={this.state.stateFileList}
        >
        {this.state.imageUrl && this.state.isOpen ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} 
        </Upload>
        <Modal 
          visible={previewVisible}
          footer={null}
          onCancel={this.hidePreview}
        >
          <img
            src={previewImage}
            alt={previewImageName}
            style={{ width: '100%' }}
          />
        </Modal>
      </div>
    )
  }
}

