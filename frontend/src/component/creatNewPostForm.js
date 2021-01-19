
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card, Button, Modal, Form, Input, Radio, Upload ,message, Icon} from 'antd';
import  UploadImage   from './UploadImage';
import { BASE_URL, UPLOAD_IMAGE_ACTION, DELETE_IMAGE_ACTION } from '../common/APIpath';
import  { addNewPost } from '../axios'
const { Item } = Form



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
        super(props);
    };
    // const { fileList, imgNumber,onChange } = this.props;
    // const list = fileList||[]
    // const { previewVisible, previewImage } = this.state;

    state = {
        loading: false,
        imageUrl: '',
        fileInfoList: [{ status: '', uid: 0, url: '',}]
    };
    
    handleChange = (info) => {  
        // console.log("handleChange", info)
        this.setState({ fileInfoList: info  })
      
        // if (info.file.status === 'uploading') {
        //   this.setState({ loading: true });
        //   return;
        // }
        // if (info.file.status === 'done') {
        //   // Get this url from response in real world.
        //   getBase64(info.file.originFileObj, imageUrl =>
        //     this.setState({
        //       imageUrl,
        //       loading: false,
        //     })

        //   );
        //   console.log("status", info.file.status);
        //   console.log("uid", info.file.uid);
        //   console.log("response", info.file.response);
        //   console.log("url", info.file.url);
        //   console.log("imageUrl", this.state.imageUrl);   
        // }
    };

    
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        const { imageUrl } = this.state;
        
        const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
        );

      return (
        // <div key={ Math.random()}>
        <div id="Modal">
        <Modal
          destroyOnClose={true}
          visible={visible}
          title="新需求"
          okText="新增"
          onCancel={onCancel}
          cancelText="取消"
          onOk={onCreate}
        >
          
        <Card title='建立屬於你自己的需求' >    
          <Form layout="vertical">
                <Form.Item label="標題">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: '標題為必填' }],
                })(<Input />)}
                </Form.Item>

                <Form.Item label="內容">
                {getFieldDecorator('description')(<Input type="textarea" />)}
                </Form.Item>

                <Form.Item label="圖片上傳">
                {getFieldDecorator('fileList',{onChange:this.handleChange}
                )(<UploadImage isInit={true}></UploadImage>)}
                </Form.Item>
            </Form>
          </Card> 
        </Modal>
        </div>
      );
    }
  },
);

class CreateNewPostForm extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    // call axios
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      console.log('Received values of form: ', form);
      form.resetFields();
      this.setState({ visible: false });
      // 送出表單
      // await' is only allowed within async functions and at the top levels of modules (141:16)
      let res = addNewPost(values);
      

    });

    ReactDOM.unmountComponentAtNode(document.getElementById('UploadImage'))
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
            新增需求單
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        {/* <Modal
          visible={this.state.visible}
          title="建立屬於你自己的需求"
          okText="新增"
          onCancel={this.handleCancel}
          cancelText="取消"
          onOk={this.handleCreate}
        >

        </Modal> */}
        {/* <UploadImage></UploadImage> */}
      </div>
    );
  }
}

         
export default CreateNewPostForm;
// module.exports = FormModal;