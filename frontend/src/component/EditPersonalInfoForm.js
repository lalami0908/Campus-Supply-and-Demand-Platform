
import React , {useEffect, useState}from 'react';
import 'antd/dist/antd.css';
import { Card, Button, Modal, Form, Input, Radio, Upload ,message, Icon, Select, InputNumber} from 'antd';
import  UploadImage   from './UploadImage';
import  { setPersonalInfo } from '../axios'
const { Option } = Select;
const { Item } = Form
const { TextArea } = Input;


var date = new Date()
var y = date.getFullYear()
var m = date.getMonth()+1 < 10?'0'+(date.getMonth()+1):date.getMonth()+1
var d = date.getDate()
var nowFormat = `${y}-${m}-${d}`


function EditInfoForm(props){
  console.log('form props:',props)
  const [loading,setLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState('')
  const [fileInfoList,setFileInfoList] = useState([{ status: '', uid: 0, url: '',}])
  
  // useEffect(()=>{
    
  // },[props.])
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
        if (!err) {

            if(await props.onSubmit(values)){
              props.onSucceed(props.form)
            }
            localStorage.setItem('values',values)
        }
    });
  };
  const handleChange = (info) => {  
      setFileInfoList(info)
  };
  const { visible, onCancel, onCreate, form } = props;
  const { getFieldDecorator } = form;
  return (
      // <div key={ Math.random()}>
      <div id="Modal">
      <Modal
        destroyOnClose={true}
        visible={visible}
        title="更新你的專屬資訊!"
        okText="等等"
        onCancel={onCancel}
        cancelText="取消"
        onOk={onCreate}
      >
      <Card title='填好填滿!' >    
        <Form onSubmit={handleSubmit}  layout="vertical">
              <Form.Item label="自介">
              {getFieldDecorator('intro', {
                  rules: [{ required: true, message: '請介紹一下自己!' }],
              })(<TextArea   placeholder="請輸入自介內容" autoSize={{ minRows: 2, maxRows: 6 }} />)}
              </Form.Item>

              <Form.Item label="專長">
              {getFieldDecorator('expert', {
                  rules: [{ required: true, message: '有什麼擅長的嗎' }],
              })(<Input />)}
              </Form.Item>

              <Form.Item label="主要需求">
              {getFieldDecorator('demand', {
                  rules: [{ required: true, message: '平常有什麼需要大家幫忙的嗎' }],
              })(<Input />)}
              </Form.Item>

              <Form.Item label="圖片上傳">
              {getFieldDecorator('fileList',{onChange:handleChange}
              )(<UploadImage isPersonal={true} isInit={true}></UploadImage>)}
              </Form.Item>
              <Form.Item className="edit-form-button">
                {getFieldDecorator('remember', {
                    initialValue: false,
                })(
                    <Button className="edit-button" type="primary" htmlType="submit">
                        {'送出'}<Icon type="arrow-right" />
                    </Button>                        
                )}
            </Form.Item>
          </Form>
        </Card> 
      </Modal>
      </div>
    );
  }
const WrappedEditInfoForm = Form.create({ name: 'form_in_modal' })(EditInfoForm);

const EditPersonalInfoForm = (props)=>{
  console.log('EditPersonalInfoForm props:',props)
  const [visible,setVisible] = useState(false)

  async  function handleEdit(values){
    console.log(`JUST FOR DEBUG!! personal info:${ JSON.stringify(values)}`)
    values = {name:localStorage.getItem('name'), ...values}
    let res = await setPersonalInfo(values)
    console.log('res:',res)
    if(res.success){  
      props.refreshTable(res);
      setVisible(false)
      return true
    } else {
      return false
    }
  }

  const handleSucceed = (form)=>{
    console.log('handleSucceed')
    form.resetFields();
    setVisible(false)
    // props.refreshTable()
  }

  const showModal = () => {
    setVisible(true)
  };
  const handleCancel = () => {
    setVisible(false)
  };


  const handleCreate = async () => {
    console.log('handleCreate')
    alert('要再想想嗎，還有什麼沒寫正確的?')
    // const { form } = this.formRef.props;
    // 前端新增的表單驗證
    // form.validateFields( async (err, values) => { //
    //   if (err) {
    //     return;
    //   } else {
        // values['NTUID'] = localStorage.getItem('NTUID');
        // values.name = localStorage.getItem('name')
        // // values.postDate = nowFormat
        // console.log('Received values of form: ', values);

        // let res = await setPersonalInfo(values);
        // // 前端顯示新增結果
        // console.log("res", res);
        // console.log("success", res.success);
        // if(res.success){
        //   form.resetFields();
        //   setVisible(false)
        // //   props.handleAddNewPostAndRefreshTable(); 
        // }
    //   }
    // // });
  };

  // const saveFormRef = formRef => {
  //   this.formRef = formRef;
  // };


return (
    <div>
        <Button type="primary" onClick={showModal}>
            編輯資料
        </Button>
        <WrappedEditInfoForm
          // wrappedComponentRef={saveFormRef}
          visible={visible}
          onSubmit={values=>handleEdit(values)}
          onSucceed={form=>handleSucceed(form)}
          onCancel={handleCancel}
          onCreate={handleCreate}
        />
    </div>
);

  
}

         
export default EditPersonalInfoForm;
// module.exports = FormModal;