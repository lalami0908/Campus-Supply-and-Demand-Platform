import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Icon, Checkbox } from 'antd'
import './login.scss';
import  {register, login, resetPassword} from '../../axios'
// import {userStore} from '../../store/userStore'


//TESTING
export default function Login() {

    async function handleLogin(values){
        console.log(`JUST FOR DEBUG!! personal info:${ JSON.stringify(values)}`)
        let res = await register(values)
        console.log(`register response: ${res}`)
    }
    const footerURL = require("../../assets/sd.jpg");
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
                        onSubmit={values => handleLogin(values)}//TODO:handleLogin
                    />
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
    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.onSubmit(values);
            }
        });
    };
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {
                    getFieldDecorator('userName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                        />,
                    )
                }
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('passWord', {
                    rules: [{ required: true, message: '请输入密码!' }],
                    initialValue: '',
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                    />,
                )}
            </Form.Item>
            <Form.Item className="login-form-button">
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <>
                        <Checkbox>記住用戶名和密碼</Checkbox>
                        <Button className="login-button" type="primary" htmlType="submit">
                            登入<Icon type="arrow-right" />
                        </Button>
                    </>,
                )}
            </Form.Item>
        </Form>
    );
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

// export default Login
