
import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Form, Avatar , Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import './styles.scss'; 
type userState = {
 	name: string,
  roles :  any
}

function Login() {
    let history = useHistory();
    const [name, setName] = useState('');
  
    const onFinish = (data: any) => {
     localStorage.setItem('name',data.username);
     localStorage.setItem('roles','admin');
     history.push("/profile");
      window.location.reload();
    };
    return (
      <div className="form-container">
        <div className="form-title">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input  placeholder="Nom d'utilisateur" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password 
        placeholder="Mot de passe " />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Se souvenir de moi</Checkbox>
        </Form.Item>

      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Connexion
        </Button>
        <div className="form-footer">
            <a href="">Créer un compte</a>
        </div>
        
      </Form.Item>
    </Form>
    </div>
    );
  
}
export default Login;