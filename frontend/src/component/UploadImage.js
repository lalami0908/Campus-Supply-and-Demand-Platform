import React, { Component } from 'react'
import { Card, Upload, Icon, Modal,message } from 'antd'
import { BASE_URL, UPLOAD_IMAGE_ACTION, DELETE_IMAGE_ACTION } from '../common/APIpath';
import  { deleteImage } from '../axios'
// import { PlusOutlined } from '@ant-design/icons'


// 限制檔案上傳
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  return isJpgOrPng
  // return isJpgOrPng && isLt2M;
}
export default class UploadImage extends Component {
  state = {
    loading: false,
    imageUrl: '',

    imageUploadNow: 0,
    imageUploadLimit: 3,
    previewVisible: false,
    previewImage: '',
    previewImageName: ''
  };

  
  // 顯示圖片
  showPreview = file => {
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
    // fileList = fileList.slice(-3);
    const file = fileList.pop()
    const { uid } = file
    const newFile = { uid, name, url: `${BASE_URL}${url}` }
    fileList.push(newFile)    
  }
  
  handleChange = ({ file, fileList }) => {
    const { status, response } = file
    // 上傳成功
    if (status === 'done') {
      const { ok, message: msg, data } = response
      if (ok) {
        this.optimizeFileList(data, fileList)
        this.setState({imageUploadNow: fileList.length})
        console.log(this.state.imageUploadNow);
        // onChange 方法
        this.props.onChange(fileList)
        message.success(msg)
      } else {
        message.error(msg)
      }
    }
  }


  handleRemove = async file => {
    // 有 url -> 上傳到server了
    const { url } = file
    // console.log(fileList);
    if (url) {
      const path = url.replace(`${BASE_URL}`, '')
      let res = await deleteImage(path);
    
      if (res.success) {
        message.success(res.msg)
      } else {
        message.error(res.msg)
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
        <p>{`上限 ${this.state.imageUploadLimit} 張`}</p>
        
        <Upload
          listType='picture-card'
          action={ UPLOAD_IMAGE_ACTION }
          headers={{ 'Authorization':  'Token ' +   localStorage.getItem('token')}}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          beforeUpload={beforeUpload}
          onPreview={this.showPreview}
        >
        {this.state.imageUrl && this.state.isOpen ? 
            (<img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> ): 
            ( this.state.imageUploadNow >= 3 ? null : uploadButton)} 
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

