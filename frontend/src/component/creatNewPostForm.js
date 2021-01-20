
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card, Button, Modal, Form, Input, Radio, Upload ,message, Icon, Select, InputNumber} from 'antd';
import  UploadImage   from './UploadImage';
import { BASE_URL, UPLOAD_IMAGE_ACTION, DELETE_IMAGE_ACTION } from '../common/APIpath';
import  { addNewPost } from '../axios'
const { Option } = Select;
const { Item } = Form



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

var date = new Date()
var y = date.getFullYear()
var m = date.getMonth()+1 < 10?'0'+(date.getMonth()+1):date.getMonth()+1
var d = date.getDate()
var nowFormat = `${y}-${m}-${d}`

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line



  class extends React.Component {
    constructor(props) {
        super(props);
    };
    state = {
        loading: false,
        imageUrl: '',
        fileInfoList: [{ status: '', uid: 0, url: '',}]
    };
    
    handleChange = (info) => {  
        // console.log("handleChange", info)
        this.setState({ fileInfoList: info  })
      
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

        const selectCategory = (
          <Select
            showSearch
            // style={{ width: 400 }}
            placeholder="請挑選類別"
            // optionFilterProp="children"
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            <Option value="Food">食</Option>
            <Option value="Clothing">衣</Option>
            <Option value="Housing">住</Option>
            <Option value="Transportation">行</Option>
            <Option value="Education">育</Option>
            <Option value="Entertainment">樂</Option>
            <Option value="Other">其他</Option>
          </Select>
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
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: '內容為必填' }],
                })(<textarea  rows="4" cols="64"/>)}
                </Form.Item>

                <Form.Item label="截止日期">

                {getFieldDecorator('deadline', {
                    rules: [{ required: false, message: '截止日期為必填' }],
                })(<Input type="date" min={nowFormat}/>)}
                </Form.Item>

                <Form.Item label="類別">
                {getFieldDecorator('category', {
                    rules: [{ required: false, message: '類別為必選' }],
                })(selectCategory)}
                </Form.Item>

                <Form.Item label="價格">
                {getFieldDecorator('price', {
                    rules: [{ required: false, message: '不含價格填零' }],
                })(<InputNumber min={0}  initialValue={0}  />)}
                </Form.Item>

                <Form.Item label="需求人數">
                {getFieldDecorator('needSupplyCnt', {
                    rules: [{ required: false, message: '需求人數為必填' }],
                })(<InputNumber min={1} max={5} initialValue={1}  />)}
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

  /** 原本以為不能在這裡 async/await 拉出去 call axios */
  handleCreate = () => {
 
    const { form } = this.formRef.props;
    // 前端新增的表單驗證
    form.validateFields( async (err, values) => { //
      if (err) {
        return;
      } else {
        values['NTUID'] = localStorage.getItem('NTUID');
        values.name = localStorage.getItem('name')
        // values.postDate = nowFormat
        console.log('Received values of form: ', values);

        let res = await addNewPost(values);
        // 前端顯示是新增結果
        alert(res.msg);
        console.log("res", res);
        console.log("success", res.success);
        if(res.success){
          form.resetFields();
          this.setState({ visible: false });
          this.props.handleAddNewPostAndRefreshTable(); // call ownDand.js: refreshTable
        }
      }
    });
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
      </div>
    );
  }
}

         
export default CreateNewPostForm;
// module.exports = FormModal;