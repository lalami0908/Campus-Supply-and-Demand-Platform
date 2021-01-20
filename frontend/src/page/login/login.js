import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Icon, Checkbox, Modal, message } from 'antd'
import './login.scss';
import  {register, login, resetPassword,genPost} from '../../axios'
// import {userStore} from '../../store/userStore'
import { navigate } from '../../common/utils';

function toHome(res){
    localStorage.setItem('token', res.user.token)
    localStorage.setItem('NTUID', res.user.NTUID)
    localStorage.setItem('userId', res.user._id)
    localStorage.setItem('name', res.user.name)  
    navigate('/home');
}

async function handleLogin(values){
    console.log(`JUST FOR DEBUG!! personal info:${ JSON.stringify(values)}`)
    let res = await login(values)
    alert(res.msg);
    console.log('res:',res)
    if(res.success){  
        // 登入成功直接導向主頁
        toHome(res)
    } 
    // 登入失敗停在此頁
}
async function handleRegister(values){
    console.log(`JUST FOR DEBUG!! personal info:${ JSON.stringify(values)}`)
    // console.log('res:',res)
    // console.log(`register response: ${JSON.stringify(res)}`)
    // console.log("here");
    

     // *** 按下登入後打登入
    // login
    // let res = await login(values)
    // if(res.success){
    //     localStorage.setItem('token', res.user.token)
    //     localStorage.setItem('NTUID', res.user.NTUID)
    //     localStorage.setItem('userId', res.user._id)  
    //     navigate('/home');
    // } else {
    //     alert(res.msg);
    // }

    // *** 按下登入後打註冊
    // register
    let res = await register(values)
    alert(res.msg);
    if(res.success){  
        // 註冊成功也直接導向主頁
        toHome(res)
    } else {
        // 註冊失敗停在此頁
    }
}

export default function Login() {


    const footerURL = require("../../assets/images/sd.jpg");
    return(
        <div className="login-body">   
            <div className="wrap">
                <div className="header" />
                <div className="avmenu">

                </div>
                <div className="extras">
                
                </div>
                <div className="content">
                    <h3>您將使用我們為台大生精心設計的服務</h3>
                    <h2>NTU Supply&Demand</h2>
                    如果對於該系統有任何疑問，請
                    <a href="mailto: r08922107@ntu.edu.tw ">來信指教</a>
                    別電洽管理者，管理者很忙。
                    <br></br>
                    <br></br>
                    <WrappedLoginForm
                        onSubmit={values => handleLogin(values)}
                        text={'登入'}
                    />
                    <Register/>
                    <hr></hr>
                    <p>

                    </p>
                </div>
                <div className="footer">
                    <img src={footerURL} alt="" />
                </div>
            </div>
        </div>
    )
}

function LoginForm(props){
    console.log('LoginForm.props:',props)
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.onSubmit(values);
            }
        });
    };
    const { getFieldDecorator } = props.form;
    const text = props.text;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            {
                (props.text==='註冊')&&(
                    <Form.Item>
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '請輸入你的暱稱！',
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="username"
                            />,
                        )
                    }
                    </Form.Item>
                )
            }
            <Form.Item>
                {
                    getFieldDecorator('NTUID', {
                        rules: [
                            {
                                required: true,
                                message: '請輸入合法台大學號！',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="NTU學號"
                        />,
                    )
                }
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '請輸入密碼!' }],
                    initialValue: '',
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密碼"
                    />,
                )}
            </Form.Item>
            {
            // (!props.fromRegister)&&(
            <Form.Item className="login-form-button">
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <>
                        <Checkbox>記住用戶名和密碼</Checkbox>
                        <Button className="login-button" type="primary" htmlType="submit">
                            {text}<Icon type="arrow-right" />
                        </Button>                        
                    </>,
                )}
            </Form.Item>//)
            }
        </Form>
    );
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

// 彈框-註冊
const Register = function (props) {
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        console.log('register')
        setVisible(true)
    };
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false)
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                註冊
            </Button>
            <Modal  visible={visible} title="目前僅開放台大生註冊"  onCancel={handleCancel}   cancelButtonProps={{ style: { display: 'none' } }}    okButtonProps={{ style: { display: 'none' } }}>
                <WrappedLoginForm
                    onSubmit={values => handleRegister(values)}
                    text={'註冊'}
                />
            </Modal>
        </>
    );
};

// export default Login
